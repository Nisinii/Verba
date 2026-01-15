from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io
import google.generativeai as genai
from pydantic import BaseModel

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
        # 1. Select the Model
        model = genai.GenerativeModel('gemini-3-flash-preview')

        # 2. Construct the Prompt (The Secret Sauce)
        prompt = f"""
        Act as a strict Senior Technical Recruiter. Compare this Resume to this Job Description.
        
        RESUME TEXT:
        {request.resume_text}

        JOB DESCRIPTION:
        {request.job_desc}

        OUTPUT IN JSON FORMAT ONLY:
        {{
            "match_score": (integer 0-100),
            "summary": (1 sentence summary of fit),
            "missing_skills": [list of strings],
            "good_match": [list of strings]
        }}
        """

        # 3. Call Gemini
        response = model.generate_content(prompt)
        
        # 4. Return the raw text (we will parse JSON in React later)
        return {"analysis": response.text}

    except Exception as e:
        # This prints the REAL error to your terminal
        print(f"####################\nAI ERROR: {str(e)}\n####################")
        # This sends the error detail to the Frontend so you can see it in Inspect Element
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")