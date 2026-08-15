import { useState } from "react";

import "./Interview.css";
import { getInterview, submitAnswer } from "../services/api";

function Interview({ interview, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(
    interview.questions[interview.current_question]
  );

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(
    interview.current_question + 1
  );

  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!answer.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await submitAnswer(
        interview.interview_id,
        answer
      );

      if (result.is_complete) {
        onComplete();
        return;
      }

      const updatedInterview = await getInterview(
        interview.interview_id
      );

      console.log("UPDATED INTERVIEW:", updatedInterview);

      setCurrentQuestion(updatedInterview.question);
      setCurrentQuestionNumber(updatedInterview.question_number);

      setAnswer("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="interview">
      <div className="interview-container">

        <div className="interview-top">
          <span className="interview-logo">
            Intervyou
          </span>

          <span className="interview-progress">
            {currentQuestionNumber} /{" "}
            {interview.questions.length}
          </span>
        </div>

        <section className="question-section">

          <div className="question-meta">
            <span>{currentQuestion.topic}</span>
            <span>{currentQuestion.difficulty}</span>
          </div>

          <h1>{currentQuestion.question}</h1>

          <form onSubmit={handleSubmit}>
            <textarea
              value={answer}
              onChange={(event) =>
                setAnswer(event.target.value)
              }
              placeholder="Type your answer..."
              disabled={isSubmitting}
            />

            <div className="answer-footer">

              <span className="keyboard-hint">
                Ctrl + Enter to submit
              </span>

              <button
                type="submit"
                disabled={!answer.trim() || isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit"}

                <span>→</span>
              </button>

            </div>
          </form>

          {error && (
            <p className="interview-error">
              {error}
            </p>
          )}

        </section>

      </div>
    </main>
  );
}

export default Interview;