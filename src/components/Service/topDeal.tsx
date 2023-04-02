import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IService } from "./serviceInterface";
import { services } from "@/data/service";

const TopDealList = () => {
  return (
    <div className="overflow-x-auto whitespace-no-wrap">
      <div className="inline-flex">
        {services.map((service) => {
          return <TopDeal key={service.id} service={service} />;
        })}
      </div>
    </div>
  );
};

const TopDeal = (props: { service: IService }) => {
  return (
    <Link href="#" className="border border-black rounded-md m-8 relative w-64">
      <div className="w-full bg-gray-200 mr-4 h-full">
        <Image
          src={props.service.image[0]}
          alt={props.service.name}
          width={500}
          height={500}
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
