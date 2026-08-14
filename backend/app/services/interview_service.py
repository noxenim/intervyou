import uuid

from app.models.interview import InterviewCreate
from app.services.question_generator import generate_questions


interviews = {}


def create_interview(data: InterviewCreate):
    interview_id = str(uuid.uuid4())

    questions = generate_questions(data)

    interview = {
        "interview_id": interview_id,
        "role": data.role,
        "experience_level": data.experience_level,
        "topics": data.topics,
        "question_count": data.question_count,
        "questions": questions.questions,
        "current_question": 0,
        "answers": [],
        "evaluations": [],
        "status": "ready",
    }

    interviews[interview_id] = interview

    return interview

def get_interview(interview_id: str):
    return interviews.get(interview_id)

def submit_answer(interview_id: str, answer: str):

    interview = interviews.get(interview_id)

    if interview is None:
        return None

    current_index = interview["current_question"]

    question = interview["questions"][current_index]

    interview["answers"].append(
        {
            "question_id": question.id,
            "answer": answer,
        }
    )

    is_last_question = (
        current_index == interview["question_count"] - 1
    )

    if is_last_question:
        interview["status"] = "completed"
    else:
        interview["current_question"] += 1

    return {
        "interview_id": interview_id,
        "question_number": current_index + 1,
        "answered": True,
        "is_complete": is_last_question,
        "next_question_number": (
            None
            if is_last_question
            else interview["current_question"] + 1
        ),
    }