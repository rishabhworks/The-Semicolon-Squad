import os
import json
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

    prompt = f"""
You are a DevOps automation expert.

🎯 TASK:
Generate a JSON response with:
1. "steps" — broken into these sections:
   - "initialSetup"
   - "frontendSetup"
   - "backendSetup"
   - "databaseSetup"
   - "ciCdSetup"

Each section should be a list of objects:
{{ "instruction": "explain what this step does", "command": "the shell command" }}

2. "bashScript" — a complete bash script that performs all the steps above in sequence for {data['OS']}.

📦 USER INPUT:
- Project Name: {data['Project']}
- Description: {data['Description']}
- Front-End: {data['FrontEnd']['Framework']} {data['FrontEnd']['Version']}
- Back-End: {data['BackEnd']['Framework']} {data['BackEnd']['Version']}
- Database: {data['Database']['Name']} {data['Database']['Version']}
- Package Manager: {data['PackageManager']}
- Target OS: {data['OS']}

⚠️ OUTPUT FORMAT:
Return only valid JSON:
{{
  "steps": {{
    "initialSetup": [...],
    "frontendSetup": [...],
    "backendSetup": [...],
    "databaseSetup": [...],
    "ciCdSetup": [...]
  }},
  "bashScript": "#!/bin/bash\\nmkdir project ..."
}}

No markdown. No explanation. Just raw JSON.
    """

    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except json.JSONDecodeError:
        print("❌ Failed to parse JSON from Gemini response.")
        return {
            "steps": {},
            "bashScript": response.text.strip()
        }
    except Exception as e:
        print("❌ AI generation error:", e)
        return {
            "steps": {},
            "bashScript": "# Something went wrong. Please try again."
        }
