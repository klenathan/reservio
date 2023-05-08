import apiClient from "@/config/axios.config";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/Context/AuthContext";
import LoadingSpinner from "../LoadingSpinner";
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

  const { data, error, isLoading } = useFetch<any>("/admin");
  return (
    <div
      className={`${props.className} flex flex-col gap-8 items-center h-screen overflow-auto`}
    >
      <div className="w-full py-4 flex justify-center">
        <p className="text-2xl font-semibold">Hello, {user?.firstName}</p>
      </div>
      {error && <div>err</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className=" lg:grid lg:grid-cols-2 gap-10 w-[80%]">
          <div className="h-80 text-xl flex flex-col items-start justify-around rounded-xl bg-zinc-50">
            <h2 className="mx-8 font-bold text-2xl">Lifetime stats</h2>
            <p className="mx-8">
              <b>Total visits</b>: {data.traffic.trafficCount}
            </p>
            <p className="mx-8">
              <b>Total reservation</b>: {data.traffic.reservationCount}
            </p>
            <p className="mx-8">
              <b>Conversion rate</b>: 0%
            </p>
          </div>

          {data.VendorReservationCount && (
            <HorizontalBar
              data={handleVendorReservation(data.VendorReservationCount)}
            />
          )}

          {data.VendorReservationCount && (
            <HorizontalBar
              data={handleVendorReservation(data.VendorReservationCount)}
            />
          )}
          {data.categoryCount && (
            <PieChart data={handleVendorReservation(data.categoryCount)} />
          )}
        </div>
      )}
      <Table />
    </div>
  );
}
