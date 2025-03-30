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

def generate_ai_response(data: dict) -> str:
    model = get_model()

    prompt = f"""
You are a DevOps automation expert.

🎯 Your task:
Generate a **single bash script** that fully sets up a full-stack project using the following input.

💡 Requirements:
- No markdown, no explanation, no code blocks.
- Just raw, copy-pasteable bash script that works for **{data['OS']}**.
- It should:
  - Create a full folder structure (e.g., `client`, `server`, `config`)
  - Initialize the project (README, git, package manager init)
  - Install selected front-end, back-end, database dependencies
  - Scaffold project using CLI tools if available (e.g., CRA, `django-admin`)
  - Set up `.gitignore`, `.env` if relevant
  - End with a dev command (e.g., `npm run dev`, `python manage.py runserver`)
  - Should be safe to run more than once (idempotent)

🎯 User Input:
- Project Name: {data['Project']}
- Description: {data['Description']}
- Front-End: {data['FrontEnd']['Framework']} {data['FrontEnd']['Version']}
- Back-End: {data['BackEnd']['Framework']} {data['BackEnd']['Version']}
- Database: {data['Database']['Name']} {data['Database']['Version']}
- Package Manager: {data['PackageManager']}
- Target OS: {data['OS']}

🎯 Output Format:
Just return a raw `.sh` script. No markdown, no headings, no comments.

Start now.
    """

    response = model.generate_content(prompt)
    return response.text.strip()
