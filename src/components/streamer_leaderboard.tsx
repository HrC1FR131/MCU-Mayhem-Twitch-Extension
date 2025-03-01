import { useEffect, useState } from "react";

function StreamerLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch("https://xanmankey.vulcan.moe/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
      });
  }, []);

  return <div>{leaderboard}</div>;
}

export default StreamerLeaderboard;
