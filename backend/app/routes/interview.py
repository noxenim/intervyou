from fastapi import APIRouter, HTTPException

from app.models.interview import (
    AnswerSubmission,
    AnswerSubmissionResponse,
    CurrentQuestionResponse,
    InterviewCreate,
    InterviewResponse,
)
from app.services.interview_service import (
    complete_interview,
    create_interview,
    get_interview,
    submit_answer,
)
from app.models.evaluation import InterviewEvaluation


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

@router.post(
    "/{interview_id}/answers",
    response_model=AnswerSubmissionResponse,
)
def answer_question(
    interview_id: str,
    data: AnswerSubmission,
):

    result = submit_answer(
        interview_id,
        data.answer,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    return result

@router.post(
    "/{interview_id}/evaluate",
    response_model=InterviewEvaluation,
)
def evaluate_completed_interview(interview_id: str):

    interview = complete_interview(interview_id)

    if interview is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found or not completed",
        )

    return {
        "evaluations": interview["evaluations"],
        "overall_score": interview["overall_score"],
        "overall_evaluation": interview["overall_evaluation"],
        "strengths": interview["strengths"],
        "gaps": interview["gaps"],
    }