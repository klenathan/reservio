import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["March", "April", "May", "June"];

const data = {
  labels,
  datasets: [
    {
      label: "App Rating",
      data: [1, 2, 3, 4],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function HorizontalBar() {
  return (
    <div className="h-fit md:m-10 p-4">
      <h1 className="w-full text-xl text-oliveGreen font-bold uppercase">
        ratings and feedbacks
      </h1>
      <div>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
