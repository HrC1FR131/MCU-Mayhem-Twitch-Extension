import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Timer({ duration }: { duration: number }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Stop when time reaches zero
      // Render the responses
      navigate("/responses");
    }

    const interval = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(interval); // Cleanup on unmount
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
