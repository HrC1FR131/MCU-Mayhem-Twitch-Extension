import React from "react";

import { Question } from "../interfaces/Question";
import { QuestionProps } from "../interfaces/QuestionProps";

function MultipleChoiceQuestion({ question, sendResponse }: QuestionProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {question.choices.split(",").map((choice, index) => (
          <button
            key={index}
            className={`bg-${
              ["red", "blue", "green", "yellow"][index % 4]
            }-500 text-white h-full w-full flex items-center justify-center p-4`}
            onClick={() => sendResponse(choice)}
          >
            <p className="font-bold text-4xl">{choice}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceQuestion;
