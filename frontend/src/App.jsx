import { useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Interview from "./pages/Interview";
import Results from "./pages/Results";

import {
  createInterview,
  evaluateInterview,
} from "./services/api";

function App() {
  const [screen, setScreen] = useState("home");
  const [interview, setInterview] = useState(null);
  const [evaluation, setEvaluation] = useState(null);

  async function handleSetupSubmit(data) {
    try {
      const interviewData = await createInterview(data);

      setInterview(interviewData);
      setScreen("interview");
    } catch (error) {
      console.error("Failed to create interview:", error);
    }
  }

  async function handleInterviewComplete() {
    try {
      const evaluationData = await evaluateInterview(
        interview.interview_id
      );

      setEvaluation(evaluationData);
      setScreen("results");

    } catch (error) {
      console.error("Failed to evaluate interview:", error);
    }
  }

  return (
    <main className="app">
      <Navbar />

      {screen === "home" && (
        <Home onStart={() => setScreen("setup")} />
      )}

      {screen === "setup" && (
        <Setup
          onBack={() => setScreen("home")}
          onSubmit={handleSetupSubmit}
        />
      )}
      {screen === "interview" && interview && (
        <Interview
          interview={interview}
          onComplete={handleInterviewComplete}
        />
      )}
      {screen === "results" && evaluation && (
        <Results evaluation={evaluation} />
      )}
    </main>
  );
}

export default App;