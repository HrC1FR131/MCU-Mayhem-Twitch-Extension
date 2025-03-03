import React from "react";

// Loaded after a viewer answers; timer will be displayed on streamers end

function ViewerAnswer() {
  return (
    <div className="bg-gray-200 h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Good answer?</h1>
      <div className="w-12 h-12 border-4 border-t-4 border-t-purple-500 border-purple-300 rounded-full mt-4 animate-spin"></div>
    </div>
  );
}

export default ViewerAnswer;
