import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://xanmankey.vulcan.moe"); // Connect to backend WebSocket

// Three different question types
// 1. Multiple choice
// 2. Short answer
// 3. Numbers

// Next step is to set up the actual twitch extension api hooks; i.e.
// - When people join stream, create a user account, and set the player username variable locally for access across the application

function ViewerQuestion() {
  const [questions, setQuestion] = useState<any[]>([]);

  // Listen for new questions via WebSocket
  useEffect(() => {
    socket.on("new_question", (data) => {
      setQuestion(() => [data.question]);
    });

    return () => {
      socket.off("new_question");
    }; // Cleanup on unmount
  }, []); // Runs once and listens for new questions

  return <div>{questions}</div>;
}

export default ViewerQuestion;
