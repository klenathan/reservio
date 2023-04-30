import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import { Vendor } from "../../../Types";

const Store = (props: { store: Vendor }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 lg:border lg:border-black lg:m-8 lg:rounded-md">
      <div className="col-span-1 flex flex-col items-center justify-center p-2">
        <div className="relative h-32 w-32">
          <Image
            src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.store.user.avatar}
            alt={props.store.name}
            fill
            className="rounded-full"
          />
        </div>

        <div>{props.store.name}</div>
        <div>@{props.store.username}</div>
      </div>
      <div className="col-span-3 p-1 flex flex-col-reverse lg:grid lg:grid-cols-3">
        <div className="lg:p-8 lg:col-span-2 ">
          <div>
            <span className="font-bold">About:</span> {props.store.desc}
          </div>
          <div>
            <span className="font-bold">Phone:</span> {props.store.phone}
          </div>
        </div>
        <div className="lg:p-10 lg:col-span-1">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center font-bold">
              <AiFillStar /> {""}{" "}
              {parseFloat(props.store.rating._avg).toFixed(2)} / 5.0
            </div>
            <div className="flex items-center">
              <RxDotFilled />
              <div className="font-bold mr-1">{props.store.rating?._count}</div>
              {parseInt(props.store.rating?._count) > 1 ? "reviews" : "review"}
            </div>
          </div>
          <div>
            <span className="font-bold">Service provides: </span>{" "}
            {props.store._count?.products} services
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
