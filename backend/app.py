from flask import Flask, request, jsonify, send_file
from Database.database import add_user_to_db, check_user_credentials
from werkzeug.exceptions import HTTPException
import google.generativeai as genai
import os
import tempfile
from dotenv import load_dotenv
from flask_cors import CORS
from AI.ai import generate_ai_response

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS to allow frontend requests
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ]
    }
}, supports_credentials=True)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY not found. Check your .env file.")
else:
    print("✅ GEMINI_API_KEY loaded successfully.")
    genai.configure(api_key=GEMINI_API_KEY)


# 👤 User login/signup route
@app.route('/api/user', methods=['POST'])
def handle_user():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 415

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        route = data.get('route')

        if not email or not password or not route:
            return jsonify({"error": "Missing required fields"}), 400

        if route == 'signup':
            added = add_user_to_db(email, password)
            if added:
                return jsonify({"message": "User registered successfully"}), 201
            else:
                return jsonify({"error": "User already exists"}), 409

        elif route == 'login':
            exists = check_user_credentials(email, password)
            if exists:
                return jsonify({"success": True, "message": "Login successful"}), 200
            else:
                return jsonify({"success": False, "message": "Invalid credentials"}), 401

        else:
            return jsonify({"error": "Invalid route value"}), 400

    except HTTPException as http_err:
        return jsonify({"error": str(http_err)}), http_err.code
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 415

        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing data in request body"}), 400

        # 💡 Generate AI response as text
        ai_output = generate_ai_response(data)

        # 💾 Save it to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".md", mode='w', encoding='utf-8') as temp_file:
            temp_file.write(ai_output)
            temp_file_path = temp_file.name

        print("✅ File generated:", temp_file_path)

        return send_file(temp_file_path, as_attachment=True, download_name="project-setup.md")

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🔁 Start server
if __name__ == '__main__':
    app.run(debug=True)
