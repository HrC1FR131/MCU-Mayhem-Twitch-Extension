import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { username } from "../webhooks/onload.tsx";
// Loaded after a viewer answers; timer will be displayed on streamers end
import { BACKEND, socket } from "../utils.tsx";

function ViewerAnswered() {
  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state?.response;
  const question = location.state?.question;

  socket.on("end_question", (data) => {
    navigate("/answer", {
      state: { correct: question.answer.split(",").includes(response) },
    });
    navigate(0);
  });

  return (
    <div className="bg-gray-200 h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Good answer?</h1>
      <div className="w-12 h-12 border-4 border-t-4 border-t-purple-500 border-purple-300 rounded-full mt-4 animate-spin"></div>
    </div>
  );
}

export default ViewerAnswered;
