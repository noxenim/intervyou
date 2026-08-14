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
        "evaluations": [],
        "status": "ready",
    }

    interviews[interview_id] = interview

    return interview