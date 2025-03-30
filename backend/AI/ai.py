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
You are an expert DevOps automation engineer.

🎯 TASK:
Generate ONLY a **single complete bash script** that:
- Creates the full project folder
- Sets up both front-end and back-end environments
- Initializes package managers
- Installs required dependencies
- Configures the database
- Starts all services (e.g., using concurrent commands, background services, or `npm run dev` / `nodemon` etc.)
- Works seamlessly on {data['OS']}
- Uses the following tech stack:

📦 USER INPUT:
- Project Name: {data['Project']}
- Description: {data['Description']}
- Front-End: {data['FrontEnd']['Framework']} {data['FrontEnd']['Version']}
- Back-End: {data['BackEnd']['Framework']} {data['BackEnd']['Version']}
- Database: {data['Database']['Name']} {data['Database']['Version']}
- Package Manager: {data['PackageManager']}

⚠️ OUTPUT FORMAT:
Return ONLY the bash script, no JSON, no explanation, no markdown. The script should:
- Be ready to run with no modification
- Be optimized and production-quality
- Be OS-compatible with: {data['OS']}
- Contain comments to explain each major step

Example:
#!/bin/bash
# Step 1: Create project directory...
mkdir myapp
cd myapp
...

❌ DO NOT return JSON or markdown
✅ ONLY return a valid bash script
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
