from flask import Flask, request, jsonify, send_file
from Database.database import add_user_to_db, check_user_credentials
from werkzeug.exceptions import HTTPException
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS
from AI.ai import generate_ai_response

load_dotenv()

app = Flask(__name__)
CORS(app)  

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not found. Check your .env file.")
else:
    print("✅ GEMINI_API_KEY loaded successfully.")

genai.configure(api_key=GEMINI_API_KEY)


@app.route('/api/user', methods=['POST', 'OPTIONS'])
def handle_user():
    if request.method == 'OPTIONS':
        return jsonify({}), 200  # Preflight response

    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        route = data.get('route')

        if not email or not password or not route:
            return jsonify({"error": "Missing required fields"}), 400

        if route == 'signup':
            add_user_to_db(email, password)
            return jsonify({"message": "User registered successfully"}), 201

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
        data = request.get_json()

        if not data:
            return jsonify({"error": "data is required"}), 400

        result = generate_ai_response(data)
        print(result)

        return send_file(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
