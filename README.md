# KAIROS

<img width="1330" height="858" alt="image 1" src="https://github.com/user-attachments/assets/86fcae77-6d3f-45c6-ba45-a5ffd82c5728" />

> **Strategic Career Intelligence.** > A high-fidelity AI orchestration engine that reverse-engineers the "Professional DNA" of every resume to align it with high-value semantic job vectors.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_1.5_Flash-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Python](https://img.shields.io/badge/Python_3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## The Concept

**Kairos** is an advanced career strategy platform designed to transform traditional job applications into an interactive dialogue between human experience and machine intelligence. It acts as a **strategic curator**, utilizing machine perception to analyze and showcase professional expertise in a premium, tactical environment.

While traditional application tools are static, Kairos uses AI to:
* Generate poetic **"Expert System Insights"** summarizing candidate alignment.
* Identify **"Missing Essentials"** by calculating the semantic distance between experience and requirements.
* Propose **"Tactical Refinements"** that re-architect weak descriptions into high-impact, quantified achievements.

<img width="1326" height="837" alt="image 2" src="https://github.com/user-attachments/assets/d997f43e-6d0d-4bd5-95eb-6bd7a6fec854" />
<img width="1327" height="856" alt="image 3" src="https://github.com/user-attachments/assets/3b8bc697-5284-47b1-a96d-ce43254d247c" />
<img width="1321" height="852" alt="image 4" src="https://github.com/user-attachments/assets/8d05933d-24fd-4166-8e90-161e340d8960" />
<img width="1329" height="849" alt="image 5" src="https://github.com/user-attachments/assets/b9840441-190d-498b-a32e-b26ab5927f23" />

---

## Key Features

* **Neural Analysis Pipeline:** Leverages **Gemini 1.5 Flash** to analyze professional narratives and extract thematic strengths and technical gaps.
* **Semantic Vector Scoring:** Calculates a real-time **Match Score** based on how well the resume "triggers" specific ATS requirements.
* **Optimization Strategy:** Provides actionable, numbered rewrites that utilize action verbs and keyword density to ensure maximum visibility.
* **Privacy by Design:** Implements a zero-retention architecture where files are processed in isolated memory and wiped immediately after analysis.
* **Premium Interactive UI:** A high-contrast, dark-mode-first interface featuring glassmorphism, radial mouse-tracking highlights, and hardware-accelerated parallax effects.
* **Fluid Motion Language:** Orchestrated staggering and viewport-triggered animations built with **Framer Motion**.

---

## How It Works

### 1. The Machine Intelligence (Python)
When a dossier is ingested, the Python FastAPI microservice performs:
* **Binary Extraction:** Uses `pypdf` to decode and normalize raw text from multi-page PDF documents.
* **Structured Reasoning:** Issues complex, multi-layered prompts to Gemini AI to return strictly validated JSON data.
* **Schema Enforcement:** Utilizes **Pydantic** to ensure all AI-generated insights follow a predictable, non-breaking structure.

### 2. The Strategic Orchestrator (React Hook)
The `useAnalysis` hook acts as the central logic hub:
* Manages the asynchronous flow from extraction to final semantic analysis.
* **Data Normalization:** Maps backend `snake_case` intelligence into frontend `camelCase` state for seamless UI rendering.
* Tracks granular pipeline stages (0-2) to drive real-time progress indicators.

### 3. The Visual Dashboard (React)
The frontend consumes neural data to:
* Render a **quantitative dashboard** featuring match scores and semantic insight summaries.
* Provide an interactive **tag-based system** for visualizing missing technical keywords.
* Apply staggered entrance animations to ensure high-density information is digestible.

---

## Project Structure

```bash
Kairos/
├── client/                # React (Vite) + Tailwind CSS
│   ├── src/components/    # Atomic design (Atoms, Organisms, Layout)
│   ├── src/hooks/         # Analysis state machine logic
│   ├── src/assets/        # Branding & Static images
│   └── src/data/          # Constants & Animation variants
└── server/                # FastAPI (Machine Intelligence)
    ├── main.py            # API Endpoints & Gemini Integration
    ├── venv/              # Isolated environment
    └── requirements.txt   # Neural dependencies
```

## Tech Stack

### Frontend & Graphics
* **React 18** & **Vite**
* **Tailwind CSS** (Glassmorphism & Layout)
* **Framer Motion** (Motion Orchestration)
* **Lucide React** (Tactical Iconography)

### Backend
* **Python 3.12**
* **FastAPI** (High-performance API)
* **Uvicorn** (ASGI Server)

### AI & Intelligence
* **Google Gemini 1.5 Flash** (LLM)
* **Pypdf** (Document Processing)
* **Pydantic** (Data Validation)

---

## Getting Started

Follow these steps to synchronize the dual-layer architecture of the Kairos ecosystem.

### 1. Clone the Ecosystem
```bash
git clone https://github.com/Nisinii/Kairos.git
cd Kairos
```

### 2. Activate the Intelligence Layer (Python)
The backend engine must be running to handle PDF parsing and Gemini AI orchestration.
```bash
cd server

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # On macOS/Linux use: source venv/bin/activate

# Install Dependencies
pip install fastapi uvicorn pypdf google-generativeai pydantic python-multipart

# Start the Engine
uvicorn main:app --reload
```

### 3. Launch the Visual Interface (React)
Open a new terminal to start the frontend development server.
```bash
cd client
npm install
npm run dev
```

#### Check out the Live Demo at: https://youtu.be/HDKZR9AIxwo

---

## Author

**Nisini Niketha** *Software Engineer & Digital Architect*

* [GitHub](https://github.com/Nisinii)
* [LinkedIn](https://www.linkedin.com/in/nisini-niketha/)
* [Contact](mailto:wnisini.niketha@gmail.com)
