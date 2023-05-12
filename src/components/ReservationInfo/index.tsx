import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import Modal from "../Modal";
import { useState } from "react";

interface IReservationInfo {
  category: string;
  productName: string;
  price: number;
  totalPrice: number;
  quantity: number;
  shopId: string;
}
const ReservationInfo = (props: IReservationInfo) => {
  const formattedPrice = props.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const formattedTotalPrice = props.totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  

  return (
    <div className="w-full flex flex-col">
      <Link
        className=" shadow mb-3
          bg-gray-50 text-slate-900 px-1 py-1 border-2 border-gray-400 rounded-none items-center inline-flex w-fit "
        href={`/store/${props.shopId}`}
        passHref
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
        <div className="text-xs ml-1 font-bold text-gray-500">
          {" "}
          Shop viewing
        </div>
      </Link>

      <div className="flex flex-row  px-3 py-3 border-2 border-midGreen rounded-md">
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
              <h1 className="font-bold text-sm md:text-base ">
                {props.productName}
              </h1>
              <div className="font-light text-xs">
                Category: {props.category}
              </div>
            </div>
            <div className="font-semibold text-sm md:text-base ">
              x{props.quantity}
            </div>
          </div>
          <div className="text-midGreen font-bold text-xs md:text-base  ">
            {formattedPrice}
          </div>
        </div>
      </div>
      <div className="border-t-2 mt-7 border-t-gray-500 border-b-2 border-b-gray-500 flex flex-col font-semibold">
        <div className="flex flex-row text-right divide-x-2 py-2  ">
          <h1 className="w-3/5 text-slate-500 pr-2 font-bold md:text-xl text-sm align-middle">
            {" "}
            Total paying
          </h1>
          <div className="w-2/5 text-lg md:text-2xl  ">
            {formattedTotalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReservationInfo;
