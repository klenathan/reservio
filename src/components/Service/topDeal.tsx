import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IService } from "./serviceInterface";
import { services } from "@/data/service";

const TopDealList = () => {
  return (
    <div className="grid grid-cols-4 place-items-center">
      {services.map((service, index) => {
        return <TopDeal key={service.id} service={service} />;
      })}
    </div>
  );
};

const TopDeal = (props: { service: IService }) => {
  return (
    <Link
      href="#"
      className="flex flex-col justify-center w-2/3 border border-black rounded-md my-8"
    >
      <div className="relative w-full h-[15rem]">
        <Image
          src={props.service.image}
          alt="..."
          fill
          style={{ objectFit: "fill", borderRadius: "0.375rem" }}
        />
        <figcaption className="absolute text-lg text-white bottom-0 italic px-2">
          <p>Discount: {(props.service.discount as number) * 100}%</p>
          <p>Location: {props.service.place}</p>
        </figcaption>
      </div>
    </Link>
  );
};

export default TopDealList;
