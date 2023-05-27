import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

export function LineChart(props: { data: any }) {
  return (
    <div className="w-full flex flex-col items-center justify-center rounded-xl bg-zinc-50 border-2  ">
      <h1 className="w-full text-center text-xl text-oliveGreen font-bold uppercase pt-2 ">
        {props.data.name}
      </h1>
      <div className="grid place-items-center w-full ">
        <Line options={options} data={props.data} />
      </div>
    </div>
  );
}
