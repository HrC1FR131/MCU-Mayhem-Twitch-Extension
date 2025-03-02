import React, { useState } from "react";

import { Question } from "../interfaces/Question";
import { QuestionProps } from "../interfaces/QuestionProps";

function NumberQuestion({ question, sendResponse }: QuestionProps) {
  const [number, setNumber] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <input
        type="number"
        className="border p-2"
        placeholder="Enter a number..."
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4"
        onClick={() => sendResponse(number)}
      >
        Submit
      </button>
    </div>
  );
}

export default NumberQuestion;
