import { useState } from "react";

import "./Results.css";

function Results({ evaluation }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  function toggleQuestion(questionId) {
    setExpandedQuestion((current) =>
      current === questionId ? null : questionId
    );
  }

  return (
    <main className="results">
      <div className="results-container">

        <header className="results-header">
          <p className="results-eyebrow">
            INTERVIEW COMPLETE
          </p>

          <h1>Your results.</h1>

          <p className="results-subtitle">
            Here's how you performed across the interview.
          </p>
        </header>


        <section className="score-section">

          <p className="score-label">
            OVERALL SCORE
          </p>

          <div className="score">
            <span className="score-number">
              {evaluation.overall_score}
            </span>

            <span className="score-total">
              / 10
            </span>
          </div>

          <p className="overall-evaluation">
            {evaluation.overall_evaluation}
          </p>

        </section>


        <section className="insights">

          <div className="insight-section">
            <p className="insight-label">
              STRENGTHS
            </p>

            {evaluation.strengths.length > 0 ? (
              <ul>
                {evaluation.strengths.map((strength, index) => (
                  <li key={index}>
                    {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-insight">
                No strengths identified.
              </p>
            )}
          </div>


          <div className="insight-section">
            <p className="insight-label">
              AREAS TO IMPROVE
            </p>

            {evaluation.gaps.length > 0 ? (
              <ul>
                {evaluation.gaps.map((gap, index) => (
                  <li key={index}>
                    {gap}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-insight">
                No major gaps identified.
              </p>
            )}
          </div>

        </section>


        <section className="question-review">

          <div className="review-header">
            <p className="review-label">
              QUESTION REVIEW
            </p>

            <span>
              {evaluation.evaluations.length} questions
            </span>
          </div>


          <div className="question-list">

            {evaluation.evaluations.map((item) => {
              const isExpanded =
                expandedQuestion === item.question_id;

              return (
                <div
                  className={`question-result ${
                    isExpanded ? "expanded" : ""
                  }`}
                  key={item.question_id}
                >

                  <button
                    className="question-result-header"
                    onClick={() =>
                      toggleQuestion(item.question_id)
                    }
                  >

                    <div className="question-result-left">

                      <span className="question-number">
                        {String(item.question_id).padStart(2, "0")}
                      </span>

                      <span>
                        Question {item.question_id}
                      </span>

                    </div>


                    <div className="question-result-right">

                      <span className="question-score">
                        {item.score}/10
                      </span>

                      <span
                        className={`question-chevron ${
                          isExpanded ? "rotated" : ""
                        }`}
                      >
                        ↓
                      </span>

                    </div>

                  </button>


                  {isExpanded && (
                    <div className="question-feedback">
                      <p>
                        {item.feedback}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>


        <footer className="results-footer">
          <button
            className="results-home-button"
            onClick={() => window.location.reload()}
          >
            Start another interview
            <span>→</span>
          </button>
        </footer>

      </div>
    </main>
  );
}

export default Results;