import { HorizontalBar } from "./horizontalBar";
import PieChart from "./pie";
import Table from "./table";

export default function AdminChart(props: { className?: string }) {
  return (
    <div className={`${props.className} h-screen overflow-auto`}>
      <div className="lg:grid lg:grid-cols-2">
        <HorizontalBar />
        <PieChart />
      </div>
      <Table />
    </div>
  );
}
