import Image from "next/image";
import Link from "next/link";
import { IService } from "../Service/serviceInterface";

const Service = (props: { service: IService }) => {
  return (
    <Link
      href="#"
      className="flex flex-col justify-center w-full shadow-xl rounded-md my-8  "
    >
      <div className="relative w-full h-[15rem] bg-slate-200 rounded-t-md">
        <Image
          src={props.service.image[0]}
          alt="..."
          fill
          className="rounded-md"
        />
      </div>
      <div className="m-5">
        <h1 className="text-xl text-black font-bold truncate">
          {props.service.name}
        </h1>
        <div>{props.service.category}</div>
        <div>{props.service.place}</div>
        <div>{props.service.store}</div>
        <div className="flex flex-row items-center">
          <div className="text-oliveGreen font-bold my-3 text-2xl pr-1">
            {props.service.price?.toLocaleString()} VND
          </div>
          <div className="text-black font-semibol text-base"> per hour</div>
        </div>
      </div>
    </Link>
  );
};

export default Service;
