import { useEffect } from "react";
import { BACKEND, socket } from "../utils.tsx";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion.tsx";
import ShortAnswerQuestion from "./ShortAnswerQuestion.tsx";
import NumberQuestion from "./NumberQuestion.tsx";

import { username } from "../utils.tsx";

// Three different question types
// 1. Multiple choice
// 2. Short answer
// 3. Numbers

// Next step is to set up the actual twitch extension api hooks; i.e.
// - When people join stream, create a user account, and set the player username variable locally for access across the application

function createUserAccount(name: string) {
  const formData = new FormData();
  formData.append("username", name);

  fetch(BACKEND + "/create_player", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("User account created successfully");
      } else {
        console.error("Error creating user account:", response.statusText);
      }
    })
    .catch((err) => {
      console.error("Error sending data to backend:", err);
    });
}

function ViewerQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const question = JSON.parse(location.state?.question.question.question);

  // Send the response to the server
  const sendResponse = (response: string) => {
    console.log("Sending response:", response);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("response", response);

    fetch(BACKEND + "/response", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        // console.log("Response submitted successfully");
        // console.log(data.results.responses);
        // console.log(data.results.question);
        // console.log(data.results.question_type);
        // console.log(data);
        navigate("/answered", {
          state: { response: response, question: question },
        });
        // navigate(0);
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };

  useEffect(() => {
    console.log("useEffect viewer_question with results calls");
    socket.on("results", () => {
      navigate("/answer", {
        state: { correct: false },
      });
      // navigate(0);
    });

    return () => {
      socket.off("results");
    };
  }, [navigate]);

  return username != undefined ? (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      key={location.key}
    >
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
  ) : (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      key={location.key}
    >
      <p className="text-4xl font-bold">Your first question</p>
      <input
        type="text"
        placeholder="Enter a username"
        className="w-64 px-4 py-2 mb-4 rounded-full border border-gray-300 focus:outline-none"
        onChange={(e) => {
          createUserAccount(e.target.value);
        }}
      />
    </div>
  );
}

export default ViewerQuestion;
