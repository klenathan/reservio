import Image from "next/image";
import HistoryPage from "../History";
import HistoryCard from "../HistoryCard";
import Button from "../Button";
const ReservationInfo = (props: any) => {
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
  return (
    <div className="w-full">
      <Button
        className=" shadow
          bg-gray-50 text-slate-900 px-1 py-1 border-2 border-gray-400 rounded-none flex flex-row text-left"
        btnStyle="bomaytulam"
      >
        <div className="relative w-[1rem] h-[1rem] ">
          <Image
            src="/assets/profile.svg"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="Profile Hamburger"
            className="px-0 object-cover"
          />
        </div>
        <div className="text-xs "> Shop viewing</div>
      </Button>

      <div className="mt-7 flex flex-row">
        <div className="relative md:w-[6rem] h-[5rem] rounded-t-md w-1/5">
          <Image
            src="/assets/background_authenticate.svg"
            className="animate-fadeIn object-cover"
            alt="..."
            fill
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col justify-between ml-2 md:mr-0">
            <div>
              <h1 className="font-bold text-sm md:text-base ">DALAT HOMESTAY with beautiful view</h1>
              <div className="font-light text-xs">Category: Travel</div>
            </div>
            <div className="font-semibold text-sm md:text-base ">x5 nights</div>
          </div>
          <div className="text-midGreen font-bold text-xs md:text-base  ">$5.000.000</div>
        </div>
      </div>
      <div className="border-t-2 mt-7 border-t-gray-500 border-b-2 border-b-gray-500 flex flex-col font-semibold">
        <div className="flex flex-row text-right py-2 border-b-2 divide-x-2 divide-slate-400/25">
          <h1 className="w-3/5 text-slate-500  pr-2"> Total service price</h1>
          <div className="w-2/5 ">5.000.000 $</div>
        </div>
        <div className="flex flex-row text-right divide-x-2 py-2 border-b-2">
          <h1 className="w-3/5 text-slate-500  pr-2 ">Discount</h1>
          <div className="w-2/5 ">5.000.000 $</div>
        </div>
        <div className="flex flex-row text-right divide-x-2 py-2  ">
          <h1 className="w-3/5 text-slate-500 pr-2"> Total paying</h1>
          <div className="w-2/5 ">5.000.000 $</div>
        </div>
      </div>
    </div>
  );
};
export default ReservationInfo;
