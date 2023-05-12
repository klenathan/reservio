import Image from "next/image";
import Button from "../../Button";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface IVendorCardProps {
  id: string;
  userName?: string;
  status: string;
  productName: string;
  productImage: string;
  price: number;
  totalPrice: number;
  statusColor: string;
  avatar?: string;
}

const VendorVerifyCard = (props: IVendorCardProps) => {
  const formattedPrice = props.price!.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [status, setStatus] = useState(props.status);

  const handleAccept = async () => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reservation/reject/${props.id}`,
      {}
    );
    setStatus("accepted");
  };

  const handleReject = async () => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reservation/reject/${props.id}`,
      {}
    );
    setStatus("rejected");
  };
  return (
    <div
      className="w-full md:w-full shadow-lg mb-3 mt-3 rounded-md
     m-auto"
    >
      <div className="relative w-full h-[15rem] rounded-t-md ">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.productImage}
          alt={props.id}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="object-cover"
        />

        <div
          className={`absolute top-3 right-3 p-1 rounded-md backdrop-blu status-border status-${props.statusColor}`}
        >
          <p className={`font-bold uppercase text-${props.statusColor}`}>
            {props.status}
          </p>
        </div>
      </div>

      <div className="break-words p-3 pl-1 pt-1 md:p-6 md:pl-2 md:pt-1 flex flex-col justify-between  ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <div className="relative w-[1rem] h-[1rem] ">
                <Image
                  src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.avatar!}
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  alt="Profile Hamburger"
                  className="px-0 object-cover rounded-full"
                />
              </div>
              <Link
                href={`/store/${encodeURIComponent(props.userName!)}`}
                className="font-[900] text-base md:text-xl m-2"
              >
                Username: {props.userName}
              </Link>
              <Link
                href={`/detail/${encodeURIComponent(props.id)}`}
                className="text-base md:text-xl font-bold"
              >
                {props.productName}
              </Link>
            </div>

            <h1 className="font-medium text-xs">
              <span className="text-xs md:text-xl font-medium text-midGreen">
                {formattedPrice}
              </span>
            </h1>
          </div>
          <div className="grid grid-rows-2 gap-2 mt-2 ml-2">
            {props.status === "PENDING" ? (
              <>
                <Button
                  className="  shadow
    hover:shadow-xl text-white bg-gradient-to-tr from-midGreen to-limeGreen py-2 px-4"
                  btnStyle="bomaytulam"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
                <Button
                  className="  shadow
    hover:shadow-xl text-white bg-gradient-to-tr from-heavyRed to-lightRed py-0 px-0"
                  btnStyle="bomaytulam"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </>
            ) : null}
          </div>
        </div>

        <div className="font-extrabold text-gray-600 md:text-base pt-3">
          Total:
          <span className="text-xl md:text-2xl font-extrabold text-midGreen ml-3">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
export default VendorVerifyCard;
