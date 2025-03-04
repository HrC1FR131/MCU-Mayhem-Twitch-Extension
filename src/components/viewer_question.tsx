import { useEffect, useState } from "react";
import { BACKEND, socket } from "../utils.tsx";
import { useLocation } from "react-router-dom";

import { Question } from "../interfaces/Question.tsx";
import { useNavigate } from "react-router-dom";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion.tsx";
import ShortAnswerQuestion from "./ShortAnswerQuestion.tsx";
import NumberQuestion from "./NumberQuestion.tsx";

import { username } from "../webhooks/onload.tsx";

// Three different question types
// 1. Multiple choice
// 2. Short answer
// 3. Numbers

// Next step is to set up the actual twitch extension api hooks; i.e.
// - When people join stream, create a user account, and set the player username variable locally for access across the application

function ViewerQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const question = JSON.parse(location.state?.question.question.question);

  // Send the response to the server
  const sendResponse = (response: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("response", response);

    fetch(BACKEND + "/response", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response submitted successfully:", data);
        navigate("/answered", {
          state: { response: response, question: question },
        });
        navigate(0);
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };

  useEffect(() => {
    console.log("useEffect viewer_question with results calls");
    socket.on("results", (data) => {
      navigate("/answer", {
        state: { correct: "false" },
      });
      navigate(0);
    });

    return () => {
      socket.off("results");
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {question ? (
        question.question_type === "multiple_choice" ||
        question.question_type === "this_or_that" ? (
          <MultipleChoiceQuestion
            question={question}
            sendResponse={sendResponse}
          />
        ) : question.question_type === "short_answer" ? (
          <ShortAnswerQuestion
            question={question}
            sendResponse={sendResponse}
          />
        ) : question.question_type === "numbers" ? (
          <NumberQuestion question={question} sendResponse={sendResponse} />
        ) : (
          <p className="text-2xl font-bold">Unknown question type</p>
        )
      ) : (
        <p className="text-2xl font-bold">Waiting for a question...</p>
      )}
    </div>
  );
}

export default ViewerQuestion;
