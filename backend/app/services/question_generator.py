import json

from app.llm.client import client
from app.models.interview import InterviewCreate
from app.models.question import InterviewQuestionSet


def generate_questions(data: InterviewCreate) -> InterviewQuestionSet:

    prompt = f"""
You are a technical interview question generator.

Create a technical interview for the following candidate profile.

Role:
{data.role}

Experience level:
{data.experience_level}

Topics:
{", ".join(data.topics)}

Number of questions:
{data.question_count}

Requirements:
- Generate exactly {data.question_count} questions.
- Questions must be relevant to the role.
- Questions must match the candidate's experience level.
- Cover the requested topics.
- Avoid repeating the same concept.
- Progress from easier questions to harder questions.
- Questions should be suitable for a conversational technical interview.

Return ONLY valid JSON in this exact structure:

{{
    "questions": [
        {{
            "id": 1,
            "topic": "Python",
            "difficulty": "easy",
            "question": "..."
        }}
    ]
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.3,
    )

    content = response.choices[0].message.content

    questions_data = json.loads(content)

    return InterviewQuestionSet.model_validate(questions_data)