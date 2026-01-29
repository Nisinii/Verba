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
GENAI_API_KEY = "API_KEY"
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
        Act as a strict Senior Technical Recruiter and ATS Expert. 
        Analyze this Resume against this Job Description.

        RESUME TEXT:
        {request.resume_text}

        JOB DESCRIPTION:
        {request.job_desc}

        CRITICAL OUTPUT INSTRUCTIONS:
        1. Output MUST be valid JSON only. No Markdown.
        2. Analyze specifically for ATS (Applicant Tracking System) compatibility.
        3. Follow this EXACT JSON schema:
        {{
            "match_score": (integer 0-100),
            "summary": (string, 2 sentences professional summary),
            "missing_skills": [array of strings, top 5 technical skills missing],
            "ats_check": {{
                "score": (integer 0-100, distinct from match score),
                "issues": [array of strings, e.g. "Found passive voice", "Missing LinkedIn link", "Date formatting inconsistent"],
                "summary": (string, feedback on structure/grammar)
            }},
            "suggested_rewrites": [
                {{
                    "section": (string, e.g. "Experience"),
                    "current": (string, pick a weak sentence from resume),
                    "improved": (string, rewrite it to include keywords and use action verbs)
                }}
            ],
            "interview_prep": [
                (string, 3 difficult technical questions based on the gaps found)
            ]
        }}
        """

        response = model.generate_content(prompt)
        raw_text = response.text
        
        # Cleanup Logic
        clean_text = raw_text.replace("```json", "").replace("```", "").strip()
        
        try:
            json_data = json.loads(clean_text)
            return {"analysis": json_data}
        except json.JSONDecodeError:
            print("JSON Error: AI returned bad format")
            return {"analysis": None, "error": "AI did not return valid JSON"}

    except Exception as e:
        print(f"AI ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")