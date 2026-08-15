import { useState } from "react";

import "./Setup.css";

function Setup({ onBack, onSubmit }) {
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Junior");
  const [topics, setTopics] = useState("");
  const [questionCount, setQuestionCount] = useState(5);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      role,
      experience_level: experienceLevel,
      topics: topics
        .split(",")
        .map((topic) => topic.trim())
        .filter(Boolean),
      question_count: questionCount,
    });
  }

  return (
    <main className="setup">
      <div className="setup-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="setup-header">
          <p className="setup-eyebrow">INTERVIEW SETUP</p>

          <h1>Make it yours.</h1>

          <p>
            Tell Intervyou what you want to practice.
          </p>
        </div>

        <form className="setup-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="role">Role</label>

            <input
              id="role"
              type="text"
              placeholder="e.g. Backend Developer"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="experience">Experience level</label>

            <select
              id="experience"
              value={experienceLevel}
              onChange={(event) =>
                setExperienceLevel(event.target.value)
              }
            >
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="topics">Topics</label>

            <input
              id="topics"
              type="text"
              placeholder="e.g. Python, FastAPI, SQL"
              value={topics}
              onChange={(event) => setTopics(event.target.value)}
              required
            />

            <span className="field-hint">
              Separate topics with commas.
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="question-count">
              Number of questions
            </label>

            <select
              id="question-count"
              value={questionCount}
              onChange={(event) =>
                setQuestionCount(Number(event.target.value))
              }
            >
              <option value={5}>5</option>
              <option value={7}>7</option>
              <option value={10}>10</option>
            </select>
          </div>

          <button className="setup-submit" type="submit">
            Begin Interview
            <span>→</span>
          </button>
        </form>
      </div>
    </main>
  );
}

export default Setup;