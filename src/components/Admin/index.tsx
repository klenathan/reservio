import apiClient from "@/config/axios.config";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/Context/AuthContext";
import { HorizontalBar } from "./horizontalBar";
import PieChart from "./pie";
import Table from "./table";

const handleCatgoryCountData = (data: any) => {
  let result: any = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  data.forEach((category: any, i: number) => {
    result.labels.push(category.category);
    result.datasets[0].data.push(category.count);
    result.datasets[0].backgroundColor.push(
      `hsla(${(330 / data.length) * i}, 60%, 80%, 1)`
    );
  });
  return result;
};

const handleVendorReservation = (data: any) => {
  let result: any = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  data.forEach((vendor: any, i: number) => {
    result.labels.push(vendor.name);
    result.datasets[0].label = "# Reservation";
    result.datasets[0].data.push(vendor.count);
    result.datasets[0].backgroundColor.push(
      `hsla(${(330 / data.length) * i}, 60%, 80%, 1)`
    );
  });
  return result;
};

export default function AdminChart(props: { className?: string }) {
  const { user } = useAuth();
  const [categoryCount, setCategoryCount] = useState();
  const [vendorReservationData, setVendorReservationData] = useState();
  const [traffic, setTraffic] = useState<any>({});

  useEffect(() => {
    apiClient
      .get(`/admin`)
      .then((response: any) => {
        const catgoryCountData = handleCatgoryCountData(
          response.data.categoryCount
        );
        setCategoryCount(catgoryCountData);
        const vendorReservationCount = handleVendorReservation(
          response.data.VendorReservationCount
        );
        setVendorReservationData(vendorReservationCount);
        setTraffic(response.data.traffic);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
    //
  }, []);
  return (
    <div
      className={`${props.className} flex flex-col gap-8 items-center h-screen overflow-auto`}
    >
      <div className="w-full py-4 flex justify-center">
        <p className="text-2xl font-semibold">Hello, {user?.firstName}</p>
      </div>
      <div className=" lg:grid lg:grid-cols-2 gap-10 w-[80%]">
        {traffic && (
          <div className="h-80 text-xl flex flex-col items-start justify-around rounded-xl bg-zinc-50">
            <h2 className="mx-8 font-bold text-2xl">Lifetime stats</h2>
            <p className="mx-8">
              <b>Total visits</b>: {traffic.trafficCount}
            </p>
            <p className="mx-8">
              <b>Total reservation</b>: {traffic.reservationCount}
            </p>
            <p className="mx-8">
              <b>Conversion rate</b>: {traffic.conversionRate.toFixed(2)}%
            </p>
          </div>
        )}
        {vendorReservationData && (
          <HorizontalBar data={vendorReservationData} />
        )}

        {vendorReservationData && (
          <HorizontalBar data={vendorReservationData} />
        )}
        {categoryCount && <PieChart data={categoryCount} />}
      </div>
      <Table />
    </div>
  );
}
