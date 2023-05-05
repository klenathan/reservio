import Image from "next/image";
import { useState } from "react";

interface IHistoryCardProps {
  vendorName?: string;
  status: string;
  productName?: string;
  price?: number;
  totalPrice: number;
  statusColor: string;
}

const HistoryCard: React.FC<IHistoryCardProps> = (props: IHistoryCardProps) => {
  return (
    <div className="flex flex-col mt-3 w-full shadow-lg p-5 ">
      <div className="flex flex-row items-center justify-between mb-3">
        <div className="flex flex-row items-center w-3/5">
          <div className="relative w-[2rem] h-[2rem]">
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
          <div className="">
            <a href="#" className="font-[900] text-base md:text-xl ">
              {props.vendorName}
            </a>
          </div>
        </div>
        <div>
          <h1
            className={`pr-3 text-sm md:text-base font-bold uppercase text-${props.statusColor}`}
          >
            {" "}
            {props.status}{" "}
          </h1>
        </div>
      </div>

      <div>
        <div className="flex md:flex-row flex-col">
          <div className="relative md:w-[20rem] h-[15rem] rounded-t-md">
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
          <div className="break-words pl-3 flex flex-col justify-between ">
            <div>
              <a href="#" className="text-base md:text-xl font-bold">
                {props.productName}
              </a>
              <h1 className="font-medium text-xs">
                {" "}
                Price:{" "}
                <span className="text-xs md:text-xl font-medium text-midGreen">
                  {" "}
                  {props.price?.toLocaleString()}
                </span>{" "}
              </h1>
            </div>
            <div className="font-extrabold text-gray-600 md:text-xl">
              Total:
              <span className="text-xl md:text-3xl font-extrabold text-midGreen ml-3">
                {props.totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
