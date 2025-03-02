import { useEffect, useState } from "react";
import { BACKEND } from "../utils.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { Player } from "../interfaces/Player.tsx";

function StreamerLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(BACKEND + "/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data.leaderboard);
      });
  }, []);

  const handleScoreChange = (username: string, scoreChange: number) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("score", scoreChange.toString()); // Ensure score is a string
    fetch(BACKEND + "/update_score", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data.leaderboard);
      });
  };

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
      <button
        className="w-64 px-4 py-2 mb-4 rounded-full text-black focus:outline-none hover:bg-blue-600"
        onClick={() => {
          const randomPlayer =
            leaderboard[Math.floor(Math.random() * leaderboard.length)];
          if (randomPlayer) {
            alert(`Random Player: ${randomPlayer.username}`);
          }
        }}
      >
        Choose Random Player
      </button>
      <div className="overflow-y-auto w-64">
        {filteredLeaderboard.map((player, index) => (
          <div
            key={player.username}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between"
          >
            <p className="font-bold">
              {index + 1}. {player.username}
            </p>
            <input
              type="number"
              className="w-16 px-2 py-1 rounded border border-gray-300 focus:outline-none"
              defaultValue={player.score}
              onChange={(e) =>
                handleScoreChange(player.username, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreamerLeaderboard;
