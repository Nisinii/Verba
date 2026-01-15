from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io
import google.generativeai as genai
from pydantic import BaseModel
import json

app = FastAPI()

# --- CONFIGURATION ---
# PASTE YOUR API KEY HERE
GENAI_API_KEY = "AIzaSyDwUiuTZaUnHb52Vih8r61-ZC_F5wsK0hI"
genai.configure(api_key=GENAI_API_KEY)

# Allow React to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Model for the Analysis Request
class AnalyzeRequest(BaseModel):
    resume_text: str
    job_desc: str

@app.get("/")
def read_root():
    return {"message": "Verba Backend is Online"}

@app.post("/extract-resume")
async def extract_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    try:
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return {
            "filename": file.filename,
            "text_preview": text[:200] + "...",
            "full_text": text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze_match(request: AnalyzeRequest):
    try:
        print("--- Starting Analysis ---")
        model = genai.GenerativeModel('gemini-3-flash-preview')

        prompt = f"""
        Act as a strict Senior Technical Recruiter. Compare this Resume to this Job Description.
        
        RESUME TEXT:
        {request.resume_text}

        JOB DESCRIPTION:
        {request.job_desc}

        CRITICAL OUTPUT INSTRUCTIONS:
        1. Output MUST be valid JSON only.
        2. Do not include markdown formatting (no ```json or ```).
        3. Follow this exact schema:
        {{
            "match_score": (integer 0-100),
            "summary": (string, 2 sentences max, professional tone),
            "missing_skills": [array of strings, specific technical skills missing],
            "good_match": [array of strings, skills present in both]
        }}
        """

        response = model.generate_content(prompt)
        raw_text = response.text
        
        # --- CLEANUP LOGIC ---
        # Sometimes Gemini still adds markdown. Let's remove it safely.
        clean_text = raw_text.replace("```json", "").replace("```", "").strip()
        
        # Test if it is valid JSON
        try:
            json_data = json.loads(clean_text) # This checks if it's real JSON
            return {"analysis": json_data}     # Return the OBJECT, not the string
        except json.JSONDecodeError:
            print("JSON Error: AI returned bad format")
            return {"analysis": None, "error": "AI did not return valid JSON"}

    except Exception as e:
        print(f"AI ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")