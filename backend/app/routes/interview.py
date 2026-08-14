from fastapi import APIRouter, HTTPException

from app.models.interview import (
    CurrentQuestionResponse,
    InterviewCreate,
    InterviewResponse,
)
from app.services.interview_service import (
    create_interview,
    get_interview,
)


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"],
)


@router.post("/", response_model=InterviewResponse)
def start_interview(data: InterviewCreate):
    interview = create_interview(data)

    return interview

@router.get("/{interview_id}", response_model=CurrentQuestionResponse)
def get_current_question(interview_id: str):

    interview = get_interview(interview_id)

    if interview is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    current_index = interview["current_question"]

    question = interview["questions"][current_index]

    return {
        "interview_id": interview_id,
        "question_number": current_index + 1,
        "total_questions": interview["question_count"],
        "question": question,
    }