from app.llm.client import client
from app.models.evaluation import InterviewEvaluation


def evaluate_interview(interview) -> InterviewEvaluation:

    qa_pairs = []

    for question in interview["questions"]:
        answer_data = next(
            (
                answer
                for answer in interview["answers"]
                if answer["question_id"] == question.id
            ),
            None,
        )

        qa_pairs.append(
            {
                "question_id": question.id,
                "topic": question.topic,
                "difficulty": question.difficulty,
                "question": question.question,
                "answer": answer_data["answer"],
            }
        )

    prompt = f"""
You are a technical interview evaluator.

Evaluate the candidate's completed technical interview.

Candidate role:
{interview["role"]}

Experience level:
{interview["experience_level"]}

Interview questions and answers:

{qa_pairs}

Evaluation requirements:

1. Evaluate every question individually.
2. Give every answer a score from 0 to 10.
3. Evaluate technical correctness.
4. Evaluate how completely the candidate answered the question.
5. Consider the candidate's experience level when scoring.
6. Give concise, useful feedback for each answer.
7. Calculate an overall score from 0 to 10.
8. Provide an overall evaluation of the candidate.
9. Identify the candidate's main strengths.
10. Identify the candidate's main gaps or areas for improvement.

Return ONLY valid JSON matching this structure:

{{
    "evaluations": [
        {{
            "question_id": 1,
            "score": 8,
            "feedback": "..."
        }}
    ],
    "overall_score": 7.5,
    "overall_evaluation": "...",
    "strengths": [
        "..."
    ],
    "gaps": [
        "..."
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
        temperature=0.2,
    )

    content = response.choices[0].message.content
    content = content.strip()

    if content.startswith("```"):
        content = content.removeprefix("```json")
        content = content.removeprefix("```")
        content = content.removesuffix("```")
        content = content.strip()

    import json

    evaluation_data = json.loads(content)

    return InterviewEvaluation.model_validate(evaluation_data)