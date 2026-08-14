from pydantic import BaseModel, Field

class InterviewCreate(BaseModel):
    role: str = Field(min_length=1)
    experience_level: str = Field(min_length=1)
    topics: list[str] = Field(min_length=1)
    question_count: int = Field(default=5, ge=5, le=20)

class InterviewResponse(BaseModel):
    interview_id: str
    role: str
    experience_level: str
    topics: list[str]
    question_count: int
    status: str