import { useEffect, useState } from "react";
import { BACKEND } from "../utils.tsx";

import { Player } from "../interfaces/Player.tsx";

function ViewerLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the current leaderboard for the viewer, highlighting the player; TODO pass username
    fetch(BACKEND + "/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data.leaderboard);
      });
  }, []);

  const filteredLeaderboard = leaderboard.filter((player) =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <input
        type="text"
        placeholder="Search by username"
        className="w-64 px-4 py-2 mb-4 rounded-full border border-gray-300 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto w-64">
        {filteredLeaderboard.map((player, index) => (
          <div
            key={player.username}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between"
          >
            <p className="font-bold">
              {index + 1}. {player.username}
            </p>
            <p className="font-bold">{player.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewerLeaderboard;
