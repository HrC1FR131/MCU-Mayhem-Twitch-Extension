// For the viewer; answering quesstions, seeing ranking, or viewing escape room progress
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./utils";

import ViewerLeaderboard from "./components/viewer_leaderboard";
import ViewerQuestion from "./components/viewer_question";
import ViewerAnswered from "./components/viewer_answered";
import ViewerAnswer from "./components/viewer_answer";

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>
    <Router>
      <Routes>
        <Route path="/" element={<ViewerLeaderboard />} />
        {/* The below line is just for localhost testing */}
        <Route path="/viewer.html" element={<ViewerLeaderboard />} />
        <Route path="/question" element={<ViewerQuestion />} />
        <Route path="/answered" element={<ViewerAnswered />} />
        <Route path="/answer" element={<ViewerAnswer />} />
      </Routes>
    </Router>
  </SocketProvider>
);
