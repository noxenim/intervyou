import "./Results.css";

function Results({ evaluation }) {
  return (
    <main className="results">
      <h1>Interview Complete</h1>

      <h2>
        Score: {evaluation.overall_score} / 10
      </h2>

      <p>
        {evaluation.overall_evaluation}
      </p>

      <h3>Strengths</h3>

      <ul>
        {evaluation.strengths.map((strength, index) => (
          <li key={index}>{strength}</li>
        ))}
      </ul>

      <h3>Gaps</h3>

      <ul>
        {evaluation.gaps.map((gap, index) => (
          <li key={index}>{gap}</li>
        ))}
      </ul>

      <h3>Question Scores</h3>

      {evaluation.evaluations.map((item) => (
        <div key={item.question_id}>
          <strong>
            Question {item.question_id}: {item.score}/10
          </strong>

          <p>{item.feedback}</p>
        </div>
      ))}
    </main>
  );
}

export default Results;