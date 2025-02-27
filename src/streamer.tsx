// For the streamer; shows either a pie chart for multiple choice responses, a bar graph for numerical responses, or a word cloud for free responses
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// For bar and pie charts
import { Chart } from "chart.js/auto";
// For word clouds
import { WordCloud } from "wordcloud/src/wordcloud2.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <p>Streamer</p>
  </StrictMode>
);
