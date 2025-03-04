import { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  redirect,
} from "react-router-dom";

import { socket } from "../utils";

function TimerComponent({
  duration,
  question_number,
  answer,
}: {
  duration: number;
  question_number: number;
  answer: string;
}) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("times up");
      // Remove timer from the page
      const timerElement = document.getElementById("timer");
      if (
        timerElement &&
        timerElement.parentElement &&
        timerElement.parentElement.parentElement
      ) {
        timerElement.parentElement.parentElement.removeChild(
          timerElement.parentElement
        );
      }
      // Render the responses
      // navigate(
      //   `/responses?question_number=${question_number}&answer=${answer}`
      // );
      // navigate(0);
      // Emit the answer to the server
      socket.emit("end_question", { question_number });
    }

    const interval = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(interval); // Cleanup on unmount
  }, [timeLeft, navigate, question_number]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div style={{ fontSize: "96px", fontWeight: "bold", color: "black" }}>
      {minutes}:{seconds}
    </div>
  );
}

function Timer({
  duration,
  question_number,
  answer,
}: {
  duration: number;
  question_number: number;
  answer: string;
}) {
  return (
    <Router>
      <TimerComponent
        duration={duration}
        question_number={question_number}
        answer={answer}
      />
    </Router>
  );
}

export default Timer;
