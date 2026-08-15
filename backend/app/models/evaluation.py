from pydantic import BaseModel, Field


class QuestionEvaluation(BaseModel):
    question_id: int
    score: float = Field(ge=0, le=10)
    feedback: str


class InterviewEvaluation(BaseModel):
    evaluations: list[QuestionEvaluation]
    overall_score: float = Field(ge=0, le=10)
    overall_evaluation: str
    strengths: list[str]
    gaps: list[str]