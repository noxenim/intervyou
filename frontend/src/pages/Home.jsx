import "./Home.css";

function Home({ onStart }) {
  return (
    <main className="home">
      <section className="home-hero">
        <p className="home-eyebrow">AI-POWERED TECHNICAL INTERVIEWS</p>

        <h1>
          Practice for the
          <br />
          interview you want.
        </h1>

        <p className="home-description">
          Intervyou creates realistic technical interviews tailored to
          your role and skills, then evaluates your performance.
        </p>

        <button className="primary-button" onClick={onStart}>
          Start Interview
          <span>→</span>
        </button>
      </section>
    </main>
  );
}

export default Home;