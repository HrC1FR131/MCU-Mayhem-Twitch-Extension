// User config
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>
    <p>
      Wow look at all these great config options that I definitely implemented
    </p>
  </StrictMode>
);
