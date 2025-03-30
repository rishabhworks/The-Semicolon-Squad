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

def generate_ai_response(tech_stack: str, prompt_type: str) -> str:
    model = get_model()

    prompt = f"Generate step-by-step setup commands for: {tech_stack}. Ensure compatibility with Linux/macOS."


    response = model.generate_content(prompt)
    return response.text
