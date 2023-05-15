import ReservationInfo from "../ReservationInfo";
import { useState } from "react";
import { Reservation, Status } from "../../../Types";
import HistoryCard from "../HistoryCard";

const HistoryPage = (props: { reservation: Reservation[] }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(Status.pending);
  const filteredUserCards = props.reservation.filter(
    (card) => card.status == selectedStatus
  );
  console.log(props.reservation);
  const changeColor = (selectedStatus: string) => {
    switch (selectedStatus) {
      case Status.pending:
        return "pendingYellow";
      case Status.accepted:
        return "acceptedBlue";
      case Status.rejected:
        return "rejectedRed";
      case Status.finished:
        return "completedGreen";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:w-full mx-3">
      <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4">
        BOOKING HISTORY
      </h1>
      <div
        className="grid grid-cols-4 place-items-center content-center h-[3rem] 
    shadow-md font-medium bg-slate-100 text-black text-xs md:text-base"
      >
        <button
          className={`hover:text-pendingYellow text-xs md:text-base duration-200 ${
            selectedStatus === "PENDING" && "text-pendingYellow"
          }`}
          onClick={() => setSelectedStatus(Status.pending)}
        >
          PENDING
        </button>
        <button
          className={`hover:text-acceptedBlue duration-200 ${
            selectedStatus === "accepted" && "text-acceptedBlue"
          }`}
          onClick={() => setSelectedStatus(Status.accepted)}
        >
          ACCEPTED
        </button>
        <button
          className={`hover:text-rejectedRed duration-200 ${
            selectedStatus === "rejected" && "text-rejectedRed"
          }`}
          onClick={() => setSelectedStatus(Status.rejected)}
        >
          REJECTED
        </button>
        <button
          className={`hover:text-completedGreen duration-200 ${
            selectedStatus === "completed" && "text-completedGreen"
          }`}
          onClick={() => setSelectedStatus(Status.finished)}
        >
          COMPLETED
        </button>
      </div>
      <div>
        {filteredUserCards.map((reservation) => (
          <HistoryCard
            key={reservation.id}
            rid={reservation.id}
            vendorName={reservation.Product?.name}
            status={reservation.status}
            productName={reservation.Product?.name}
            productImage={
              process.env.NEXT_PUBLIC_IMG_ENDPOINT +
              reservation.Product?.images[0]
            }
            price={reservation.Product?.price}
            totalPrice={reservation.total}
            statusColor={changeColor(selectedStatus)}
            id={reservation.Product.id}
            vendorAva={
              process.env.NEXT_PUBLIC_IMG_ENDPOINT +
              reservation.Product.vendor.user.avatar
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
