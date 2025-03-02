import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BACKEND } from "../utils.tsx";

// For bar and pie charts
import { Chart } from "chart.js/auto";
// For word clouds
import WordCloud from "wordcloud";

function StreamerResponses() {
  useEffect(() => {
    fetch(BACKEND + "/end_question")
      .then((response) => response.json())
      .then((data) => {
        const ctx = document.getElementById("chart") as HTMLCanvasElement;
        if (
          data.question_type === "multiple_choice" ||
          data.question_type === "this_or_that"
        ) {
          new Chart(ctx, {
            type: "pie",
            data: {
              labels: data.options,
              datasets: [
                {
                  data: data.responses,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                },
              ],
            },
          });
        } else if (data.question_type === "numbers") {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: data.options,
              datasets: [
                {
                  label: "Responses",
                  data: data.responses,
                  backgroundColor: "#36A2EB",
                },
              ],
            },
          });
        } else if (data.question_type === "short_answer") {
          WordCloud(document.getElementById("chart")!, {
            list: data.responses.map((response: string) => [
              response,
              Math.random() * 100,
            ]),
          });
        }
      });
  }, []);

  return <div id="chart"></div>;
}

export default StreamerResponses;
