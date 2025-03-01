// For the viewer; answering quesstions, seeing ranking, or viewing escape room progress
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ViewerLeaderboard from "./components/viewer_leaderboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViewerLeaderboard></ViewerLeaderboard>
  </StrictMode>
);
