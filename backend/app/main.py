from fastapi import FastAPI

from app.routes.interview import router as interview_router


app = FastAPI(
    title="Intervyou",
    description="AI-powered technical interview platform",
    version="0.1.0",
)


app.include_router(interview_router)


@app.get("/")
def root():
    return {
        "message": "Intervyou API is running"
    }