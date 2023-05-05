import { useState } from "react";
import { Reservation } from "../../../Types";
import HistoryCard from "../HistoryCard";

const HistoryPage = (props: { reservation: Reservation[] }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("PENDING");
  const filteredUserCards = props.reservation.filter(
    (card) => card.status == selectedStatus
  );
  console.log(filteredUserCards);

  const changeColor = (selectedStatus: string) => {
    switch (selectedStatus) {
      case "PENDING":
        return "pendingYellow";
      case "ACCEPTED":
        return "acceptedBlue";
      case "REJECTED":
        return "rejectedRed";
      case "FINISHED":
        return "completedGreen";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4">
        {" "}
        BOOKING HISTORY
      </h1>
      <div
        className="grid grid-cols-4 place-items-center content-center h-[3rem] 
    shadow-md font-medium bg-slate-100 text-black  text-sm md:text-base"
      >
        <button
          className={`hover:text-pendingYellow duration-200 ${
            selectedStatus === "PENDING" && "text-pendingYellow"
          }`}
          onClick={() => setSelectedStatus("PENDING")}
        >
          PENDING
        </button>
        <button
          className={`hover:text-acceptedBlue duration-200 ${
            selectedStatus === "accepted" && "text-acceptedBlue"
          }`}
          onClick={() => setSelectedStatus("accepted")}
        >
          ACCEPTED
        </button>
        <button
          className={`hover:text-rejectedRed duration-200 ${
            selectedStatus === "rejected" && "text-rejectedRed"
          }`}
          onClick={() => setSelectedStatus("rejected")}
        >
          REJECTED
        </button>
        <button
          className={`hover:text-completedGreen duration-200 ${
            selectedStatus === "completed" && "text-completedGreen"
          }`}
          onClick={() => setSelectedStatus("completed")}
        >
          COMPLETED
        </button>
      </div>
      <div>
        {filteredUserCards.map((reservation) => (
          <HistoryCard
            key={reservation.id}
            vendorName={reservation.Product?.name}
            status={reservation.status}
            productName={reservation.Product?.name}
            price={reservation.Product?.price}
            totalPrice={reservation.total}
            statusColor={changeColor(selectedStatus)}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
