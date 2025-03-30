import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Get the best available model
def get_model():
    available_models = [m.name for m in genai.list_models()]
    return genai.GenerativeModel(
        "models/gemini-1.5-pro" if "models/gemini-1.5-pro" in available_models
        else "models/gemini-2.5-pro-exp-03-25"
    )

# Generate AI response based on user configuration
def generate_ai_response(data: dict) -> dict:
    model = get_model()

    # Prompt for Gemini
    prompt = f"""
You are a professional DevOps automation engineer.

🎯 YOUR TASK:
Generate a complete and clean bash script to fully set up a full-stack project using the configuration below.

🧱 USER CONFIGURATION:
- Project Name: {data['Project'].strip() if isinstance(data['Project'], str) else 'project'}
- Description: {data['Description'].strip()}
- Front-End: {data['FrontEnd']['Framework']} {data['FrontEnd']['Version']}
- Back-End: {data['BackEnd']['Framework']} {data['BackEnd']['Version']}
- Database: {data['Database']['Name']} {data['Database']['Version']}
- Package Manager: {data['PackageManager']}
- OS: {data['OS']}

🛑 ABSOLUTE RULES:
- ❌ DO NOT use markdown formatting (NO triple backticks or ```bash)
- ❌ DO NOT return JSON (no keys like `steps` or `bashScript`)
- ❌ DO NOT escape characters (NO `\\n`, `\\`, or `\"`)
- ❌ DO NOT wrap the script in strings or quotes
- ✅ ONLY return clean bash code that starts with:
  #!/bin/bash

✅ THE SCRIPT MUST:
- Be directly executable as-is
- Be saved into a `.sh` file with:
  chmod +x setup.sh
  ./setup.sh
- Work on {data['OS']} and include platform-specific commands where needed
- Include inline comments explaining each major section
- Set up directories, install dependencies, configure the backend/frontend/database, and launch both services

EXAMPLES:
- React → `npx create-react-app`
- Node → `express`, `npm init`, basic `index.js`
- Python → `venv`, `pip install`, basic `app.py`
- MongoDB → `pymongo`, sample queries
- MySQL → `mysql2` (Node) or `mysql-connector-python` (Python)
- Windows → use `start cmd /C "..."` for concurrent commands
- Linux/macOS → use `&` for background services

🔚 FINAL OUTPUT:
ONLY return a clean bash script — no quotes, no explanation, no formatting, no JSON. Just the script content beginning with:
#!/bin/bash
"""






    try:
        response = model.generate_content(prompt)
        bash_script = response.text.strip()

        # Strip markdown backticks if Gemini adds them by mistake
        if bash_script.startswith("```bash"):
            bash_script = bash_script.replace("```bash", "").strip()
        if bash_script.endswith("```"):
            bash_script = bash_script[:-3].strip()

        return {
            "steps": {},  # Legacy compatibility — can be removed if unused
            "bashScript": bash_script
        }

    except Exception as e:
        print("❌ AI generation error:", e)
        return {
            "steps": {},
            "bashScript": "# Something went wrong. Please try again."
        }
