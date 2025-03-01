import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// For bar and pie charts
import { Chart } from "chart.js/auto";
// For word clouds
import WordCloud from "wordcloud";

function StreamerResponses() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("https://xanmankey.vulcan.moe/end_question")
      .then((response) => response.json())
      .then((data) => {
        setResponses(data);
      });
  }, []);

  return <div>{responses}</div>;
}

export default StreamerResponses;
