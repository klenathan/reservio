import { useState } from "react";
import { Reservation, Status } from "../../../Types";
import VendorVerifyCard from "../Vendor/VendorHistoryCard";

const VerifyPage = (props: { reservation: Reservation[] }) => {
  const [selectedStatus, setSelectedStatus] = useState(Status.pending);

  const filteredUserCards = props.reservation.filter(
    (card) => card.status === selectedStatus
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
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4">
        PENDING RESERVATION
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
        {filteredUserCards.map((card) => (
          <VendorVerifyCard
            key={card.id}
            userName={card.customer?.username}
            status={card.status}
            productName={card.Product?.name}
            price={card.Product?.price}
            totalPrice={card.total}
            statusColor={changeColor(selectedStatus)}
            avatar={card.customer?.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default VerifyPage;
