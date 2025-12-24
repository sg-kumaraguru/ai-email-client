from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message":"Backend is running.."}

@app.get("/api/hello")
def hello():
    return {
        "status":"success",
        "data":"Hello from FastAPI"
    }


