from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ConfigurationError, OperationFailure
from dotenv import load_dotenv
from urllib.parse import quote_plus
import os

load_dotenv()

# Function to establish a database connection
def get_database():
    username = quote_plus(os.getenv('MONGODB_USERNAME'))
    password = quote_plus(os.getenv('MONGODB_PASSWORD'))
    cluster_url = os.getenv('MONGODB_CLUSTER_URL')

    uri = f"mongodb+srv://{username}:{password}@{cluster_url}/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)

    try:
        client.admin.command('ping')
        db = client['Skeleton']
        return client, db['Users']

    except ConnectionFailure as e:
        raise e

# Function to insert username and password into the database
def add_user_to_db(_email: str, user_password: str):
    client, collection = get_database()
    try:
        user_document = {"username": _email, "password": user_password}
        collection.insert_one(user_document)

    except ConfigurationError as e:
        raise e
    except OperationFailure as e:
        raise e
    except Exception as e:
        raise e
    finally:
        client.close()

# Function to check if username and password exist in the database
def check_user_credentials(_email: str, user_password: str):
    client, collection = get_database()
    try:
        user_document = collection.find_one({"username": _email, "password": user_password})
        return bool(user_document)

    except ConfigurationError as e:
        raise e
    except OperationFailure as e:
        raise e
    except Exception as e:
        raise e
    finally:
        client.close()
