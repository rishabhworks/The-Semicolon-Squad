import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_model():
    available_models = [m.name for m in genai.list_models()]
    return genai.GenerativeModel(
        "models/gemini-1.5-pro" if "models/gemini-1.5-pro" in available_models
        else "models/gemini-2.5-pro-exp-03-25"
    )

def generate_ai_response(data: str) -> str:
    model = get_model()

    prompt = f"""
        You are an expert in DevOps automation and developer tooling. Based on user input, generate a detailed project setup guide and an OS-compatible Bash script that builds a ready-to-run full-stack application skeleton. 

        ---

        🎯 USER INPUT FORMAT:
        - Project Name
        - Description
        - Front-End Framework (e.g., React, Vue, Angular)
        - Back-End Framework (e.g., Node.js + Express, Django, Flask)
        - Database (e.g., PostgreSQL, MongoDB, MySQL)
        - Cloud Platform (optional) (e.g., AWS, Vercel, Netlify)
        - Package Manager (e.g., npm, yarn, pip)
        - Target OS (Windows, macOS, Linux)

        ---

        ✅ 1. TECH STACK OVERVIEW
        - Display the selected stack clearly in a markdown table with versions.
        - Mention compatibility tips or known issues with stack combinations.

        ---

        🖥️ 2. OS COMPATIBILITY TABLE
        For each major setup step:
        - Provide commands in a 3-column table:
            - Linux / Ubuntu
            - macOS
            - Windows (PowerShell or WSL)
        - Ensure accuracy of OS-specific syntax (e.g., brew, apt, choco, winget).

        ---

        🛠️ 3. CLI INSTALLATION & CONFIGURATION
        Include commands to:
        - Install front-end/back-end frameworks and databases
        - Scaffold the project (e.g., CRA, `django-admin startproject`)
        - Create `client/`, `server/`, and `config/` directories
        - Generate `.env`, `.gitignore`, `README.md`
        - Initialize Git
        - Use the correct package manager (npm/yarn/pip/etc.)

        ---

        ⚙️ 4. BASH SCRIPT GENERATOR
        At the end, generate a **single `setup.sh` Bash script** that:
        - Detects OS (`uname` / `$OSTYPE`)
        - Installs required dependencies (with checks to avoid duplication)
        - Sets up folder structure and scaffolds code
        - Outputs status messages (`echo` or `printf`)
        - Runs project with a dev command (e.g., `npm run dev`, `python manage.py runserver`)
        - Safe to run multiple times (idempotent)

        ---

        🧠 5. DEVELOPER EXPERIENCE NOTES
        - Include helpful developer tips:
            - `.env` secret management
            - How to run the project
            - How to deploy to the selected cloud platform
            - Recommended VS Code settings or extensions

        ---

        🔁 GOAL:
        Output everything as if the user ran one command. Save time, reduce setup friction, and provide a production-level scaffold for a full-stack project across any OS.

        Use markdown formatting for readability. {{data}}
        """


    response = model.generate_content(prompt)
    return response.text
