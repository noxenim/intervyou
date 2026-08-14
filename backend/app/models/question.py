from pydantic import BaseModel


class InterviewQuestion(BaseModel):
    id: int
    topic: str
    difficulty: str
    question: str


class InterviewQuestionSet(BaseModel):
    questions: list[InterviewQuestion]