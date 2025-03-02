import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Timer from "./timer";
import { createRoot } from "react-dom/client";
import { BACKEND } from "../utils.tsx";

const socket = io(BACKEND); // Connect to backend WebSocket
console.log("Streamer websocket connected\n");

function StreamerQuestions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch all of the questions from the server
    fetch(BACKEND + "/get_questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  // Sends question json to the server
  const handleClick = (question: string) => {
    socket.emit("start_question", { question });
    // Render the Timer component
    const timerContainer = document.createElement("div");
    document.body.appendChild(timerContainer);
    const root = createRoot(timerContainer);
    root.render(<Timer duration={question.length} />);
  };

  return (
    <ul>
      {questions.map((q, index) => (
        <li key={index} onClick={() => handleClick(q)}>
          {q}
        </li>
      ))}
    </ul>
  );
}

export default StreamerQuestions;
