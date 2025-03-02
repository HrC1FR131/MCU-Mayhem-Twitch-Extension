import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Timer from "./timer";
import { createRoot } from "react-dom/client";
import { BACKEND } from "../utils.tsx";

import { Question } from "../interfaces/Question.tsx";

const socket = io(BACKEND); // Connect to backend WebSocket
console.log("Streamer websocket connected\n");

function StreamerQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch all of the questions from the server
    fetch(BACKEND + "/get_questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
      });
  }, []);

  // Sends question json to the server
  const handleClick = (question: string) => {
    socket.emit("start_question", { question });
    // Render the Timer component
    const timerContainer = document.getElementById("timer");
    const root = createRoot(timerContainer!);
    const parsedQuestion = JSON.parse(question);
    root.render(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <Timer
          duration={parsedQuestion.time}
          question_number={parsedQuestion.number}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        paddingTop: "10%",
      }}
      id="timer"
    >
      <ul style={{ width: "50%" }}>
        {questions.map((q, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            <button
              onClick={() => handleClick(JSON.stringify(q))}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px",
                fontSize: "16px",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                {q.question}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                }}
              >
                <span>Time: {q.time}</span>
                <span>Weight: {q.weight}</span>
              </div>
              <div style={{ marginLeft: "20px", fontSize: "16px" }}>
                {q.answer}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamerQuestions;
