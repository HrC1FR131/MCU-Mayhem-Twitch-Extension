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
      <nav>
        <Link to="/">Questions</Link> | <Link to="/responses">Responses</Link> |{" "}
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<StreamerQuestions />} />
        <Route path="/responses" element={<StreamerResponses />} />
        <Route path="/leaderboard" element={<StreamerLeaderboard />} />
      </Routes>
    </Router>
  </StrictMode>
);
