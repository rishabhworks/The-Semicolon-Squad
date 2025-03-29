from flask import Flask, request, jsonify
from Database.database import add_user_to_db, check_user_credentials
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

@app.route('/api/user', methods=['POST'])
def handle_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        route = data.get('route')  # either 'signup' or 'login'

        if not email or not password or not route:
            return jsonify({"error": "Missing required fields"}), 400

        if route == 'signup':
            add_user_to_db(email, password)
            return jsonify({"message": "User registered successfully"}), 201

        elif route == 'login':
            exists = check_user_credentials(email, password)
            if exists:
                return jsonify({"message": "Login successful"}), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401

        else:
            return jsonify({"error": "Invalid route value"}), 400

    except HTTPException as http_err:
        return jsonify({"error": str(http_err)}), http_err.code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
