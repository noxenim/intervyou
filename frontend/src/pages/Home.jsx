import "./Home.css";

function Home({ onStart }) {
  return (
    <main className="home">
      <section className="hero">

        <p className="hero-eyebrow">
          AI-POWERED TECHNICAL INTERVIEWS
        </p>

        <h1>
          Practice like
          <br />
          you're already there.
        </h1>

        <p className="hero-description">
          Intervyou simulates technical interviews,
          evaluates your answers, and shows you
          exactly where you can improve.
        </p>

        <button
          className="hero-button"
          onClick={onStart}
        >
          Start an interview
          <span>→</span>
        </button>

      </section>

      <section className="home-footer">

        <div>
          <span className="footer-number">01</span>
          <span>AI-generated questions</span>
        </div>

        <div>
          <span className="footer-number">02</span>
          <span>Per-question evaluation</span>
        </div>

        <div>
          <span className="footer-number">03</span>
          <span>Actionable feedback</span>
        </div>

      </section>
    </main>
  );
}

export default Home;