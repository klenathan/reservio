import React from "react";
import Image from "next/image";
import Link from "next/link";
interface IService {
  id?: number;
  name?: string;
  place?: string;
  store?: string;
  price: number;
  image: string;
}

const Service = (props: { service: IService }) => {
  return (
    <Link
      href="#"
      className="flex flex-col justify-center w-2/3 border border-black rounded-md my-8"
    >
      <div className="relative w-full h-[15rem] bg-slate-200">
        <Image
          src={props.service.image}
          alt="..."
          fill
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className="m-5">
        <h1 className="text-xl text-oliveGreen font-bold">
          {props.service.name}
        </h1>
        <div>{props.service.place}</div>
        <div>{props.service.store}</div>
        <div className="text-oliveGreen font-semibol my-3 text-2xl">
          {props.service.price} VND
        </div>
      </div>
    </Link>
  );
};

export default Service;
