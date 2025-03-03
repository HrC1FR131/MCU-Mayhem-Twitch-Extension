// For the streamer; shows either a pie chart for multiple choice responses, a bar graph for numerical responses, or a word cloud for free responses
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Streamer side has routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StreamerQuestions from "./components/streamer_questions";
import StreamerResponses from "./components/streamer_responses";
import StreamerLeaderboard from "./components/streamer_leaderboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      {/* Cut responses because it should only be accessible after a question expires */}
      {/* <Link to="/responses">Responses</Link> */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          zIndex: 1000,
          padding: "10px 0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button style={{ margin: "0 10px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Questions
          </Link>
        </button>
        <button style={{ margin: "0 10px" }}>
          <Link
            to="/leaderboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Leaderboard
          </Link>
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<StreamerQuestions />} />
        <Route path="/responses" element={<StreamerResponses />} />
        <Route path="/leaderboard" element={<StreamerLeaderboard />} />
      </Routes>
    </Router>
  </StrictMode>
);
