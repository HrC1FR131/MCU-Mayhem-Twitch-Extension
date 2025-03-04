// For the viewer; answering quesstions, seeing ranking, or viewing escape room progress
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ViewerLeaderboard from "./components/viewer_leaderboard";
import ViewerQuestion from "./components/viewer_question";
import ViewerAnswered from "./components/viewer_answered";
import ViewerAnswer from "./components/viewer_answer";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<ViewerLeaderboard />} />
      <Route path="/question" element={<ViewerQuestion />} />
      <Route path="/answered" element={<ViewerAnswered />} />
      <Route path="/answer" element={<ViewerAnswer />} />
    </Routes>
  </Router>
);
