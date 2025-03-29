from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import collection

app = FastAPI()

# Request schema
class User(BaseModel):
    username: str
    email: str
    age: int

@app.post("/api/users")
def create_user(user: User):
    try:
        user_dict = user.dict()
        result = collection.insert_one(user_dict)
        return {"message": "User created successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))