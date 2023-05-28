"use client";
import LoadingSpinner from "components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { Reservation } from "../../../../../Types";
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
          {data.status === "RATED" && data.Review ? (
            <RatingModal
              status={data.status}
              rating={data?.Review[0].rating}
              feedback={data?.Review[0].feedback}
              resevationId={data.id}
              productId={data.Product.id}
            />
          ) : data.status === "FINISHED" ? (
            <RatingModal
              status={data.status}
              rating={0}
              feedback=""
              resevationId={data.id}
              productId={data.Product.id}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
