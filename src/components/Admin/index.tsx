import { HorizontalBar } from "./horizontalBar";
import PieChart from "./pie";
import Table from "./table";

export default function AdminChart() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <HorizontalBar />
        <PieChart />
      </div>
      <Table />
    </div>
  );
}
