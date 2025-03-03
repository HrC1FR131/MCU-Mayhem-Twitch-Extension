import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BACKEND } from "../utils.tsx";

import { Question } from "../interfaces/Question.tsx";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion.tsx";
import ShortAnswerQuestion from "./ShortAnswerQuestion.tsx";
import NumberQuestion from "./NumberQuestion.tsx";

const socket = io(BACKEND); // Connect to backend WebSocket

// Three different question types
// 1. Multiple choice
// 2. Short answer
// 3. Numbers

// Next step is to set up the actual twitch extension api hooks; i.e.
// - When people join stream, create a user account, and set the player username variable locally for access across the application

function ViewerQuestion() {
  const [question, setQuestion] = useState<Question>();

  // Listen for new questions via WebSocket
  useEffect(() => {
    socket.on("new_question", (data) => {
      // Based on the question type, render the appropriate component
      setQuestion(data.question);
    });

    return () => {
      socket.off("new_question");
    }; // Cleanup on unmount
  }, []); // Runs once and listens for new questions

  // Send the response to the server
  const sendResponse = (response: string) => {
    const formData = new FormData();
    formData.append("username", "TODO: playerUsername"); // Replace with actual username variable
    formData.append("response", response);

    fetch(`${BACKEND}/responses`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };

  return (
    <div>
      {question ? (
        question.type === "multiple_choice" ||
        question.type === "this_or_that" ? (
          <MultipleChoiceQuestion
            question={question}
            sendResponse={sendResponse}
          />
        ) : question.type === "short_answer" ? (
          <ShortAnswerQuestion
            question={question}
            sendResponse={sendResponse}
          />
        ) : question.type === "numbers" ? (
          <NumberQuestion question={question} sendResponse={sendResponse} />
        ) : (
          <p>Unknown question type</p>
        )
      ) : (
        <p>Waiting for a question...</p>
      )}
    </div>
  );
}

export default ViewerQuestion;
