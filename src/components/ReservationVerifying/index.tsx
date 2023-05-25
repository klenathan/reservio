import { useState } from "react";
import { Reservation, Status } from "../../../Types";
import VendorVerifyCard from "../Vendor/VendorHistoryCard";
import VendorReport from "../Vendor/VendorReport";

const VerifyPage = (props: { reservation: Reservation[] }) => {
  const [selectedStatus, setSelectedStatus] = useState(Status.pending);
  const [field, setField] = useState("reservation");

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

  const changeSection = (field: string) => {
    switch (field) {
      case "reservation":
        return "pendingYellow";
      case "report":
        return "acceptedBlue";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:w-full mx-3  ">
      {field === "reservation" && (
        <div>
          <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4 whitespace-nowrap">
            PENDING RESERVATION
          </h1>
        </div>
      )}
      {field === "report" && (
        <div>
          <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4">
            VENDOR REPORT
          </h1>
        </div>
      )}

      <div
        className="grid grid-cols-2 place-items-center content-center h-[3rem] 
    shadow-md font-medium bg-slate-100 text-black text-xs md:text-base"
      >
        <button
          className={`hover:text-pendingYellow text-xs md:text-base duration-200 ${
            field === "reservation" && "text-pendingYellow"
          }`}
          onClick={() => setField("reservation")}
        >
          PENDING RESERVATION
        </button>
        <button
          className={`hover:text-acceptedBlue duration-200 ${
            field === "report" && "text-acceptedBlue"
          }`}
          onClick={() => setField("report")}
        >
          VENDOR REPORT
        </button>
      </div>
      {field === "reservation" && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
            {filteredUserCards.map((card) => (
              <VendorVerifyCard
                id={card.id}
                key={card.id}
                userName={card.customer?.username}
                status={card.status}
                productName={card.Product?.name}
                price={card.Product?.price}
                totalPrice={card.total}
                statusColor={changeColor(selectedStatus)}
                avatar={card.customer?.avatar}
                productImage={card.Product?.images[0]}
              />
            ))}
          </div>
        </div>
      )}
      {field === "report" && (
        <div>
          <VendorReport />
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
