import { useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Interview from "./pages/Interview";

import { createInterview } from "./services/api";

function App() {
  const [screen, setScreen] = useState("home");
  const [interview, setInterview] = useState(null);

  async function handleSetupSubmit(data) {
    try {
      const interviewData = await createInterview(data);

      setInterview(interviewData);
      setScreen("interview");
    } catch (error) {
      console.error("Failed to create interview:", error);
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
          onComplete={() => setScreen("results")}
        />
      )}
    </main>
  );
}

export default App;