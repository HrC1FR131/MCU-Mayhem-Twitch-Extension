import React, { useEffect } from "react";
import { socket } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import { username } from "../webhooks/onload";

// Loaded after a viewer answers; timer will be displayed on streamers end

function ViewerAnswer() {
  const location = useLocation();
  const correct = location.state?.correct;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/leaderboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return correct ? (
    <div
      className="flex items-center justify-center h-screen w-screen"
      style={{ backgroundColor: "green" }}
    >
      <i className="fas fa-check text-white text-6xl"></i>
    </div>
  ) : (
    <div
      className="flex items-center justify-center h-screen w-screen"
      style={{ backgroundColor: "red" }}
    >
      <i className="fas fa-times text-white text-6xl"></i>
    </div>
  );
}

export default ViewerAnswer;
