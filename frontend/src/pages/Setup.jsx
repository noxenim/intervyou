import { useState } from "react";

import "./Setup.css";

function Setup({
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [topics, setTopics] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      role,
      experience_level: experienceLevel,
      topics: topics
        .split(",")
        .map((topic) => topic.trim())
        .filter(Boolean),
      question_count: 5,
    });
  }

  return (
    <main className="setup">
      <div className="setup-container">

        <button
          className="setup-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="setup-header">
          <p className="setup-eyebrow">
            INTERVIEW SETUP
          </p>

          <h1>
            Tell us what
            <br />
            you're preparing for.
          </h1>

          <p>
            We'll generate a technical interview
            based on your preferences.
          </p>
        </div>


        <form
          className="setup-form"
          onSubmit={handleSubmit}
        >

          <div className="form-field">
            <label htmlFor="role">
              Target role
            </label>

            <input
              id="role"
              type="text"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
              placeholder="e.g. Backend Developer"
              required
            />
          </div>


          <div className="form-field">
            <label htmlFor="experience">
              Experience level
            </label>

            <select
              id="experience"
              value={experienceLevel}
              onChange={(event) =>
                setExperienceLevel(event.target.value)
              }
              required
            >
              <option value="" disabled>
                Select your level
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="Junior">
                Junior
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>
            </select>
          </div>


          <div className="form-field">
            <label htmlFor="topics">
              Topics
            </label>

            <input
              id="topics"
              type="text"
              value={topics}
              onChange={(event) =>
                setTopics(event.target.value)
              }
              placeholder="e.g. Python, FastAPI, SQL"
              required
            />

            <span className="field-hint">
              Separate multiple topics with commas.
            </span>
          </div>


          <div className="setup-submit">
            <button
                type="submit"
                disabled={isSubmitting}
                >
                {isSubmitting
                    ? "Preparing interview..."
                    : "Begin interview"}

                {!isSubmitting && <span>→</span>}
            </button>
          </div>

        </form>

      </div>
    </main>
  );
}

export default Setup;