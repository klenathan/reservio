"use client";
import { NotFound } from "next/dist/client/components/error";
import LoadingSpinner from "components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { Reservation } from "../../../../../Types";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import ReservationStatus from "@/components/ReservationStatus";
import ReservationInfo from "@/components/ReservationInfo";
import RatingModal from "@/components/RatingModal";
import { format } from "date-fns";

interface ReservationStatusParams {
  params: {
    id: string;
  };
}

export default function ReservStatus(slugs: ReservationStatusParams) {
  const { data, error, isLoading } = useFetch<Reservation>(
    `reservation/${slugs.params.id}`
  );

  console.log(slugs);

  console.log(data);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const formattedPendingDate = format(
    new Date(data?.createdAt as string),
    "MMM-dd-yyyy"
  );
  let formattedAcceptedDate = ""; // Set initial value as an empty string
  if (data?.acceptedAt) {
    formattedAcceptedDate = format(
      new Date(data.acceptedAt as string),
      "MMM-dd-yyyy"
    );
  }

  let formattedStartDate = ""; // Set initial value as an empty string
  if (data?.startAt) {
    formattedStartDate = format(
      new Date(data.startAt as string),
      "MMM-dd-yyyy"
    );
  }

  let formattedEndDate = ""; // Set initial value as an empty string
  if (data?.endAt) {
    formattedEndDate = format(new Date(data.endAt as string), "MMM-dd-yyyy");
  }

  // console.log(formattedPendingDate);

  // const items = [
  //     {label: "Home", href: "/"},
  //     {label: data?., href: `/category?id=${data?.category}`},
  //     {label: data?.name, href: "/"},
  // ];
  // if (isLoading) {
  //   return (
  //     <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
  //       <LoadingSpinner text="Loading product data, please wait..." />
  //     </div>
  //   );
  // }

  // if (isError && !data) {
  //   return <NotFound />;
  // }

  if (data) {
    return (
      <div className="md:mx-24 mx-5 flex flex-col">
        <ReservationStatus
          status={data.status}
          pendingTime={formattedPendingDate}
          acceptedTime={formattedAcceptedDate}
          startTime={formattedStartDate}
          endTime={formattedEndDate}
        />
        <div className="mt-5">
          <ReservationInfo
            productName={data.Product.name}
            price={data.Product.price}
            totalPrice={data.Product.price}
            category={data.Product.category}
            quantity={data.Product.quantity}
            shopId={data.Product.vendor.username}
          />
        </div>
        <div className="self-end mt-3">
          <RatingModal status={"RATED"} star={3} ratingComment={""} />
        </div>
      </div>
    );
  }
}
