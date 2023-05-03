import { useState } from "react";
import VendorVerifyCard from "../Vendor/VendorHistoryCard";

const VerifyPage = (props: any) => {
  const [selectedStatus, setSelectedStatus] = useState("pending");
  //testing data for common user, sorry for inconvenience! ~>.<~
  const userCardArr = [
    {
      status: "pending",
      userName: "ha1",
      vendorName: "RMIT House",
      productName: "DA LAT HOUSE",
      price: 5000000,
      totalPrice: 5000000,
    },
    {
      status: "pending",
      userName: "ha1",
      vendorName: "RMIT House",
      productName: "DA LAT HOUSE",
      price: 5000000,
      totalPrice: 5000000,
    },
    {
      status: "pending",
      userName: "ha1",
      vendorName: "RMIT House",
      productName: "DA LAT HOUSE",
      price: 5000000,
      totalPrice: 5000000,
    },
    {
      status: "accepted",
      userName: "ha2",
      vendorName: "RMIT House",
      productName: "DA LAT HOUSE",
      price: 5000000,
      totalPrice: 5000000,
    },
    {
      status: "rejected",
      userName: "ha3",
      vendorName: "RMIT House",
      productName: "DA LAT HOUSE",
      price: 5000000,
      totalPrice: 5000000,
    },
    {
      status: "completed",
      userName: "ha4",
      vendorName: "RMIT House",
      productName: "DA LAT HOUSE",
      price: 5000000,
      totalPrice: 5000000,
    },
  ];

  const filteredUserCards = userCardArr.filter(
    (card) => card.status === selectedStatus
  );
  const changeColor = (selectedStatus: string) => {
    switch (selectedStatus) {
      case "pending":
        return "pendingYellow";
      case "accepted":
        return "acceptedBlue";
      case "rejected":
        return "rejectedRed";
      case "completed":
        return "completedGreen";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-2xl md:text-4xl text-midGreen font-bold mb-4">
        {" "}
        PENDING RESERVATION
      </h1>
    
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
          {filteredUserCards.map((card) => (
            <VendorVerifyCard
              key={card.productName}
              userName={card.userName}
              status={card.status}
              productName={card.productName}
              price={card.price}
              totalPrice={card.totalPrice}
              statusColor={changeColor(selectedStatus)}
            />
          ))}
        </div>
    </div>
  );
};

export default VerifyPage;