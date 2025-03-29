from pymongo.errors import ConnectionFailure, ConfigurationError, OperationFailure

# Function to insert username and password into the database
def add_user_to_db(collection, user_name: str, user_password: str):
    try:
        user_document = {"username": user_name, "password": user_password}
        result = collection.insert_one(user_document)
        print(f"🎯 User added successfully with ID: {result.inserted_id}")

    except ConnectionFailure as e:
        print("❌ Connection failed:", e)
    except ConfigurationError as e:
        print("⚙️ Configuration error:", e)
    except OperationFailure as e:
        print("🚫 Authentication/Operation error:", e)
    except Exception as e:
        print("🚨 An unexpected error occurred:", e)

# Function to check if username and password exist in the database
def check_user_credentials(collection, user_name: str, user_password: str):
    try:
        user_document = collection.find_one({"username": user_name, "password": user_password})
        if user_document:
            print("✅ User credentials are valid.")
            return True
        else:
            print("❌ User credentials are invalid.")
            return False

    except ConnectionFailure as e:
        print("❌ Connection failed:", e)
    except ConfigurationError as e:
        print("⚙️ Configuration error:", e)
    except OperationFailure as e:
        print("🚫 Authentication/Operation error:", e)
    except Exception as e:
        print("🚨 An unexpected error occurred:", e)
