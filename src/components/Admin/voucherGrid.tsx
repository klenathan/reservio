import Image from "next/image";
import { Discount, Product } from "../../../Types";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";

const DiscountCard = (props: { discount: Discount }) => {
  return (
    <div className="w-4/5 border-2 rounded-md m-2 border-gray-300 flex flex-col hover:shadow hover:border-midGreen">
      <div className="relative h-[15rem] w-full border-b-2 border-gray-300">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.discount.image}
          alt={props.discount.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 text-md italic m-2">
        <p className="text-xl font-bold line-clamp-1">
          {props.discount.name as string}
        </p>
        <p className="font-semibold text-lg">
          Discount rate: {props.discount.amount as number}%
        </p>
        <p>
          Time Available: {new Date(props.discount.start).toDateString()} -{" "}
          {new Date(props.discount.end).toDateString()}
        </p>
      </div>
    </div>
  );
};

const VoucherGrid = (props: {}) => {
  const { data, error, isLoading } = useFetch<Discount[]>(`service/discount`);

  if (!data) {
    return <>no discount</>;
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : error ? (
    <>Error Loading discounts</>
  ) : (
    <div className="grid grid-cols-4 pb-10 place-items-center">
      {data.map((discount) => {
        return <DiscountCard discount={discount} />;
      })}
    </div>
  );
};

export default VoucherGrid;
