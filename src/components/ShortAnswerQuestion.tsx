import React, { useState } from "react";

import { Question } from "../interfaces/Question";
import { QuestionProps } from "../interfaces/QuestionProps";

function MultipleChoiceQuestion({ question, sendResponse }: QuestionProps) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <input
        type="text"
        className="border p-2"
        placeholder="Type your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={() => sendResponse(answer)}
      >
        Submit
      </button>
    </div>
  );
}

export default MultipleChoiceQuestion;
