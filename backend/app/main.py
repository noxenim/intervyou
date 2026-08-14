from fastapi import FastAPI

app = FastAPI(
    title="Intervyou",
    description="AI-powered technical interview platform",
    version="0.1.0",
)
@app.get("/")
def root():
    return{
        "message":"Intervyou API is running"
    }
