from fastapi import APIRouter

from app.models.interview import InterviewCreate, InterviewResponse
from app.services.interview_service import create_interview


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"],
)


@router.post("/", response_model=InterviewResponse)
def start_interview(data: InterviewCreate):
    interview = create_interview(data)

    return interview