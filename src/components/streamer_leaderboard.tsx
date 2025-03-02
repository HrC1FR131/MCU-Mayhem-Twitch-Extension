import { useEffect, useState } from "react";
import { BACKEND } from "../utils.tsx";

function StreamerLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  // TODO: make it so streamer can increase or decrease user scores
  useEffect(() => {
    fetch(BACKEND + "/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
      });
  }, []);

  return <div>{leaderboard}</div>;
}

export default StreamerLeaderboard;
