import Image from "next/image";
import Link from "next/link";
import { IService } from "../Service/serviceInterface";

const ServiceCard = (props: { service: IService }) => {
  const img_endpoint = "https://d3j45rkkmhyyrh.cloudfront.net/";
  return (
    <Link
      href="/detail"
      className="flex flex-col justify-center w-full shadow-xl rounded-md my-8  "
    >
      <div className="relative w-full h-[15rem] rounded-t-md">
        <Image
          src={`${img_endpoint}${props.service.images[0]}`}
          alt={props.service.images[0]}
          fill
          className="rounded-md"
        />
      </div>
      <div className="m-5">
        <h1 className="text-xl text-black font-bold truncate">
          {props.service.name}
        </h1>
        <p>{props.service.category}</p>
        <p>{props.service.address}</p>
        <p>@{props.service.vendorUsername}</p>
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

export default ServiceCard;
