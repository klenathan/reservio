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

const data = {
  labels: ["March", "April", "May", "June"],
  datasets: [
    {
      label: "# Reservation",
      data: [1, 2, 3, 4],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function HorizontalBar(props: { data: any }) {
  return (
    <div className="h-80 flex flex-col items-center justify-center rounded-xl bg-zinc-50">
      <h1 className="w-full text-center text-xl text-oliveGreen font-bold uppercase">
        ratings and feedbacks
      </h1>
      <div className="grid place-items-center h-[80%] w-full">
        <Bar options={options} data={props.data || data} />
      </div>
    </div>
  );
}
