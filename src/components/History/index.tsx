import Image from "next/image";
import Link from "next/link";

const HistoryPage = (props: any) => {
  const size = 100;
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
        <a href="#" className=" hover:text-pendingYellow duration-200">
          PENDING
        </a>
        <a href="#" className=" hover:text-acceptedBlue duration-200">
          ACCEPTED
        </a>
        <a href="#" className=" hover:text-rejectedRed duration-200">
          REJECTED
        </a>
        <a href="#" className=" hover:text-completedGreen duration-200">
          COMPLETED
        </a>
      </div>
    </div>
  );
};

export default HistoryPage;
