import Image from "next/image";
import Link from "next/link";
import {Product} from "../../../Types";

const Card = (props: { service: Product }) => {
  const img_endpoint = process.env.NEXT_PUBLIC_IMG_ENDPOINT;
  return (
    <Link
      href={`/detail/${encodeURIComponent(props.service.id)}`}
      className="flex flex-col w-full h-full shadow-xl rounded-xl my-8 transition-all border
        hover:bg-zinc-100"
    >
      <div className="relative w-full h-[15rem] rounded-t-md">
        <Image
          className="object-cover rounded-t-md"
          src={`${img_endpoint}${props.service.images[0]}`}
          alt={props.service.name}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
      <div className="flex flex-[1] flex-col m-5">
        <h1 className="text-xl text-black font-bold truncate">
          {props.service.name}
        </h1>
        <p>{props.service.category}</p>
        <div>
          <p className="line-clamp-3">{props.service.address}</p>
        </div>
      </div>
      <div className="flex flex-row flex-[1] m-5 items-center border-t">
        <div className="text-oliveGreen font-bold my-3 text-2xl pr-1">
          {props.service.price?.toLocaleString()} VND
        </div>
        <div className="text-black font-semibol text-base"> per hour</div>
      </div>
    </Link>
  );
};

export default Card;
