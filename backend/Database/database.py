from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ConfigurationError, OperationFailure
from dotenv import load_dotenv
from urllib.parse import quote_plus
import os

load_dotenv()

username = quote_plus(os.getenv('MONGODB_USERNAME'))
password = quote_plus(os.getenv('MONGODB_PASSWORD'))
cluster_url = os.getenv('MONGODB_CLUSTER_URL')

uri = f"mongodb+srv://{username}:{password}@{cluster_url}/?retryWrites=true&w=majority&appName=Cluster0"

try:
    # Initialize MongoDB Client
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)

    # Verify Connection
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB!")

    # Access the database and collection
    db = client['Skeleton']
    collection = db['Users']

    # (Optional) Verify collection access
    collection_count = collection.count_documents({})
    print(f"📂 Collection 'Users' has {collection_count} documents.")

except ConnectionFailure as e:
    print("❌ Connection failed:", e)
except ConfigurationError as e:
    print("⚙️ Configuration error:", e)
except OperationFailure as e:
    print("🚫 Authentication/Operation error:", e)
except Exception as e:
    print("🚨 An unexpected error occurred:", e)
finally:
    # Close the client connection
    client.close()
    print("🔒 MongoDB connection closed.")