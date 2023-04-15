import React from "react";
import { HorizontalBar } from "./horizontalBar";
import PieChart from "./pie";

export default function AdminChart() {
  return (
    <div>
      <PieChart />
      <HorizontalBar />
    </div>
  );
}
