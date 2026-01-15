from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

app = FastAPI()

# Allow React to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Verba Backend is Online"}

@app.post("/extract-resume")
async def extract_resume(file: UploadFile = File(...)):
    # 1. Check if it's a PDF
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        # 2. Read the file into memory
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        
        # 3. Extract text using pypdf
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
            
        # 4. Return the text (we'll see this in the browser console)
        return {
            "filename": file.filename,
            "text_preview": text[:200] + "...", # Show first 200 chars
            "full_text": text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))