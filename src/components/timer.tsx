import { useState, useEffect, useContext } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  redirect,
} from "react-router-dom";

// import { socket } from "../utils";
import { SocketContext } from "../utils";

function TimerComponent({
  duration,
  question_number,
  answer,
}: {
  duration: number;
  question_number: number;
  answer: string;
}) {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);
  let end_question_emitted = false;

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
      if (!end_question_emitted) {
        socket.emit("end_question", { question_number });
        end_question_emitted = true;
      }
    } else {
      interval = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(interval); // Cleanup on unmount
  }, [timeLeft, navigate, question_number]);

  useEffect(() => {
    console.log("useEffect timer with results calls");
    socket.on("results", (data) => {
      console.log("results", data);
      navigate("/responses", { state: { data: data } });
      navigate(0);
    });

    return () => {
      socket.off("results");
    };
  }, []);

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
