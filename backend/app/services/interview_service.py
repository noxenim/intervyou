import uuid

from app.models.interview import InterviewCreate


interviews = {}


def create_interview(data: InterviewCreate):
    interview_id = str(uuid.uuid4())

    interview = {
        "interview_id": interview_id,
        "role": data.role,
        "experience_level": data.experience_level,
        "topics": data.topics,
        "question_count": data.question_count,
        "status": "created",
    }

    interviews[interview_id] = interview

    return interview