import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IService } from "./serviceInterface";
import { services } from "@/data/service";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect } from "react";



const SlideLeft = () => {
  var slider = document.getElementById("slider");
  slider.scrollLeft = slider.scrollLeft - 500;
  if (slider.scrollLeft === 0) {
    slider.scrollLeft = slider.scrollWidth;
  }
};
const SlideRight = () => {
  var slider = document.getElementById("slider");
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
    slider.scrollLeft = 0;
  } else {
    slider.scrollLeft += 500;
  }
};

const TopDealList = () => {
  return (
    <div className="flex flex-row items-center">
      <MdChevronLeft onClick={SlideLeft} size={50} className="cursor-pointer opacity-50 hover:opacity-100">
        {" "}
      </MdChevronLeft>
      <div
        id="slider"
        className="flex items-center overflow-x-auto scroll-smooth whitespace-no-wrap scrollbar-hide "
      >
        <div className="inline-flex items-center">
          {services.map((service) => {
            return <TopDeal key={service.id} service={service} />;
          })}
        </div>
      </div>
      <MdChevronRight
        size={50}
        onClick={SlideRight}
        className="cursor-pointer opacity-50 hover:opacity-100"
      ></MdChevronRight>
    </div>
  );
};

const TopDeal = (props: { service: IService }) => {
  return (
    <Link href="#" className="rounded-md m-8 relative w-64 shadow-xl">
      <div className="w-full bg-gray-200 mr-4 h-full rounded-md hover:scale-105 ease-in-out duration-300 ">
        <Image
          src={props.service.image[0]}
          alt={props.service.name}
          width={500}
          height={500}
          style={{ objectFit: "fill", borderRadius: "0.375rem" }}
        />
        <figcaption className="absolute text-lg text-white bottom-0 italic px-2 rounded-md">
          <p>Discount: {(props.service.discount as number) * 100}%</p>
          <p>Location: {props.service.place}</p>
        </figcaption>
      </div>
    </Link>
  );
};

export default TopDealList;
