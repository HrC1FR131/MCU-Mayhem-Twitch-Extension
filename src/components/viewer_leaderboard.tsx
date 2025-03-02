import { useEffect, useState } from "react";
import { BACKEND } from "../utils.tsx";

function ViewerLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch the current leaderboard for the viewer, highlighting the player; TODO pass username
    fetch(BACKEND + "/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
      });
  }, []);

  return <div>{leaderboard}</div>;
}

export default ViewerLeaderboard;
