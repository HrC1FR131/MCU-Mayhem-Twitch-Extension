import { useEffect, useState, useRef } from "react";
import { BACKEND, socket } from "../utils.tsx";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

// For bar and pie charts
import { Chart } from "chart.js/auto";
import { CategoryScale, ChartConfiguration } from "chart.js";
import "chart.js/auto";
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud";
// For word clouds
// import WordCloud from "wordcloud";

Chart.register(WordCloudController, WordElement);

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
  const location = useLocation();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const data = location.state?.data;

  useEffect(() => {
    console.log("useEffect streamer responses");
    console.log("question results", data);
    const responses = data.responses;
    const correctAnswers = data.question.answer?.split(",");
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    console.log(data);
    const { labels, counts } = processResponses(responses);

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
                backgroundColor: labels.map((label) =>
                  correctAnswers?.includes(label) ? "green" : "red"
                ),
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      } else if (data.question_type === "numbers") {
        const closestLabel = labels.reduce((prev, curr) => {
          return Math.abs(Number(curr) - Number(correctAnswers?.[0])) <
            Math.abs(Number(prev) - Number(correctAnswers?.[0]))
            ? curr
            : prev;
        });

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                data: counts,
                backgroundColor: labels.map((label) =>
                  label === closestLabel ? "green" : "red"
                ),
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      } else if (data.question_type === "short_answer") {
        new Chart(ctx, {
          type: WordCloudController.id,
          data: {
            labels: labels,
            datasets: [
              {
                data: counts.map((count) => 10 + count * 10),
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            elements: {
              word: {
                color: (context) => {
                  const labels = context.chart.data.labels;
                  const label = labels
                    ? (labels[context.dataIndex] as string)
                    : "";
                  console.log(label);
                  return correctAnswers?.includes(label) ? "green" : "red";
                },
              },
            },
          },
        });
      }
    }
    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        paddingTop: "10%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas
        ref={chartRef}
        id="chart"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

export default StreamerResponses;
