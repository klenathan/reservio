import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../Types";

const Card = (props: { service: Product }) => {
  const img_endpoint = process.env.NEXT_PUBLIC_IMG_ENDPOINT;
  return (
    <Link
      href={`/detail/${encodeURIComponent(props.service.id)}`}
      className="flex flex-col justify-center w-full shadow-xl rounded-md my-8  "
    >
      <div className="relative w-full h-[15rem] rounded-t-md">
        <Image
          src={`${img_endpoint}${props.service.images[0]}`}
          alt={props.service.images[0]}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
      <div className="m-5">
        <h1 className="text-xl text-black font-bold truncate">
          {props.service.name}
        </h1>
        <p>{props.service.category}</p>
        <div>
          <p className="line-clamp-3">{props.service.address}</p>
        </div>

        <p>@{props.service.vendor.username}</p>
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

export default Card;
