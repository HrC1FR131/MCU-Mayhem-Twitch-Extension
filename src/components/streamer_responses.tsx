import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { BACKEND } from "../utils.tsx";
import { useSearchParams } from "react-router-dom";

// For bar and pie charts
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "chart.js/auto";
// For word clouds
import WordCloud from "wordcloud";

const processResponses = (responses: Record<string, string>) => {
  const counts: Record<string, number> = {};

  // Count occurrences of each answer
  Object.values(responses).forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1;
  });

  return {
    labels: Object.keys(counts), // Unique answers
    counts: Object.values(counts), // Number of votes per answer
  };
};

function StreamerResponses() {
  const [searchParams] = useSearchParams();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const questionNumber = searchParams.get("question_number");
  console.log(questionNumber);

  useEffect(() => {
    fetch(BACKEND + "/end_question?question_number=" + questionNumber)
      .then((response) => response.json())
      .then((data) => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        // Destroy previous chart if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }

        console.log(data);
        const { labels, counts } = processResponses(data.responses);

        if (ctx) {
          if (
            data.question_type === "multiple_choice" ||
            data.question_type === "this_or_that"
          ) {
            new Chart(ctx, {
              type: "pie",
              data: {
                labels: labels,
                datasets: [
                  {
                    data: counts,
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#4BC0C0",
                    ],
                  },
                ],
              },
            });
          } else if (data.question_type === "numbers") {
            new Chart(ctx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    data: counts,
                    backgroundColor: "#36A2EB",
                  },
                ],
              },
            });
          } else if (data.question_type === "short_answer") {
            // WordCloud(chartRef.current, {
            //   list: labels.map((label, index) => [label, counts[index]]),
            // });
            console.log(labels);
            console.log(counts);
            console.log(WordCloud.isSupported);
            WordCloud(chartRef.current, {
              list: labels.map((label, index) => [label, counts[index]]),
              minSize: 12,
              weightFactor: 2,
              fontFamily: "Impact",
              color: "random-dark",
              rotateRatio: 0.5,
              backgroundColor: "#f9f9f9",
            });
          }
        }
      });
    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [questionNumber]);

  return (
    <div
      key={questionNumber}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <canvas ref={chartRef} id="chart" />
    </div>
  );
}

export default StreamerResponses;
