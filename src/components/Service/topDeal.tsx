import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IService } from "./serviceInterface";
// import { services } from "@/data/service";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const SlideLeft = () => {
  let slider = document.getElementById("slider");
  if (slider) {
    slider.scrollLeft = slider.scrollLeft - 500;
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = slider.scrollWidth;
    }
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

const TopDealList = () => {
  const [queryService, setServices] = useState<IService[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/service"
      )
      .then((r) => {
        setServices(r.data);
      });
  }, []);

  return (
    <div>
      {queryService.length == 0 ? (
        <LoadingSpinner loading={queryService.length == 0} />
      ) : (
        <div className="flex flex-row items-center my-8 ">
          <MdChevronLeft
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
              {queryService.map((service) => {
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
      )}
    </div>
  );
};

const TopDeal = (props: { service: IService }) => {
  const img_endpoint = "https://d3j45rkkmhyyrh.cloudfront.net/";

  return (
    <Link href="#" className="h-[15rem] relative w-[20rem] shadow-xl">
      <div
        className="w-full bg-gray-200 h-full rounded-md 
      hover:shadow-xl ease-in-out duration-300 "
      >
        <div className="relative flex h-full rounded-md">
          <Image
            src={img_endpoint + props.service.images[0]}
            alt={props.service.name}
            fill
            className="object-cover rounded-"
          />
        </div>

        <figcaption className="absolute text-lg text-white bottom-0 italic px-2 rounded-md">
          <p>Discount: {(props.service.discount as number) * 100}%</p>
          <p>Location: {props.service.address}</p>
        </figcaption>
      </div>
    </Link>
  );
};

export default TopDealList;
