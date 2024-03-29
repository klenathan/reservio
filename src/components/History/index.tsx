import { useState } from "react";
import { Reservation, Status } from "../../../Types";
import HistoryCard from "../HistoryCard";

const HistoryPage = (props: { reservation: Reservation[] }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(Status.pending);
  const filteredUserCards = props.reservation.filter(
    (card) => card.status == selectedStatus
  );
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
      case Status.rated:
        return "ratedOrange";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:w-full">
      <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4">
        BOOKING HISTORY
      </h1>
      <div
        className="grid grid-cols-5 place-items-center content-center h-[3rem] 
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
            selectedStatus === "ACCEPTED" && "text-acceptedBlue"
          }`}
          onClick={() => setSelectedStatus(Status.accepted)}
        >
          ACCEPTED
        </button>
        <button
          className={`hover:text-rejectedRed duration-200 ${
            selectedStatus === "REJECTED" && "text-rejectedRed"
          }`}
          onClick={() => setSelectedStatus(Status.rejected)}
        >
          REJECTED
        </button>
        <button
          className={`hover:text-completedGreen duration-200 ${
            selectedStatus === "FINISHED" && "text-completedGreen"
          }`}
          onClick={() => setSelectedStatus(Status.finished)}
        >
          COMPLETED
        </button>
        <button
          className={`hover:text-ratedOrange duration-200 ${
            selectedStatus === "RATED" && "text-ratedOrange"
          }`}
          onClick={() => setSelectedStatus(Status.rated)}
        >
          RATED
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
