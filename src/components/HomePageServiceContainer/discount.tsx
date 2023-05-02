import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import LoadingSpinner from "../LoadingSpinner";
import apiClient from "@/config/axios.config";
import { Discount } from "../../../Types";

const SlideLeft = () => {
  let slider = document.getElementById("slider");
  if (slider) {
    slider.scrollLeft = slider.scrollLeft - 500;
  }
};
const SlideRight = () => {
  var slider = document.getElementById("slider");
  if (slider) {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0;
    } else {
      slider.scrollLeft += 500;
    }
  }
};

const Discount = () => {
  const [queryDiscount, setDiscount] = useState<Discount[]>([]);
  useEffect(() => {
    apiClient.get("service/discount").then((r) => {
      setDiscount(r.data);
    });
  }, []);

  return (
    <div>
      {queryDiscount.length == 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-row items-center my-8 p-2">
          <MdChevronLeft
            id="left"
            onClick={SlideLeft}
            size={50}
            className="cursor-pointer opacity-50 hover:opacity-100"
          >
            {" "}
          </MdChevronLeft>
          <div
            id="slider"
            className="flex items-center overflow-x-auto scroll-smooth whitespace-no-wrap scrollbar-hide "
          >
            <div className="inline-flex gap-8 items-center">
              {queryDiscount.map((discount) => {
                return <DiscountCard key={discount.id} discount={discount} />;
              })}
            </div>
          </div>
          <MdChevronRight
            id="right"
            size={50}
            onClick={SlideRight}
            className="cursor-pointer opacity-50 hover:opacity-100"
          ></MdChevronRight>
        </div>
      )}
    </div>
  );
};

const DiscountCard = (props: { discount: Discount }) => {
  return (
    <div className="flex flex-col shadow">
      <div className="h-[15rem] relative w-[20rem] ">
        <div
          className="w-full bg-gray-200 h-full rounded-md
      hover:shadow-xl ease-in-out duration-300 hover:visible group"
        >
          <div className="relative flex h-full rounded-md">
            <Image
              src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.discount.image}
              alt={props.discount.name}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
          <figcaption className="invisible group-hover:visible absolute text-lg text-white bottom-0 italic bg-slate-700 w-full opacity-50 px-2">
            <p>Discount rate: {props.discount.amount as number}</p>
            <p>
              Time Available: {new Date(props.discount.start).toDateString()} -{" "}
              {new Date(props.discount.end).toDateString()}
            </p>
          </figcaption>
        </div>
      </div>
      <p className="text-xl text-center font-bold">
        {props.discount.name as string}
      </p>
    </div>
  );
};

export default Discount;
