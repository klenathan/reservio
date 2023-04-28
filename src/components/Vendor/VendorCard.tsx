import Link from "next/link";
import { Vendor } from "../../../Types";
import Image from "next/image";
import { categories } from "@/const/Categories";
import { GrServices } from "react-icons/gr";

const VendorCard = (props: { vendor: Vendor }) => {
  const img_endpoint = process.env.NEXT_PUBLIC_IMG_ENDPOINT;
  return (
    <Link
      href="/"
      className="relative flex justify-between w-full shadow-xl rounded-md my-8  "
    >
      <div className="flex items-center">
        <div className="relative h-32 w-32">
          <Image
            src={`${img_endpoint}${props.vendor.user.avatar}`}
            alt={props.vendor.username}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="rounded-full"
          />
        </div>
        <div className="m-2">
          <h1 className="text-l text-oliveGreen font-bold">
            {props.vendor.name}
          </h1>
          <div>{props.vendor.username}</div>
        </div>
      </div>
      <div className="flex items-center">
        {props.vendor.category.map((cate) => {
          let cateObj = categories.find((obj) => {
            return obj.id == cate;
          });
          return (
            <div key={cateObj?.id} className="text-center m-1 shadow-md">
              <div className="flex justify-center">{cateObj?.icon}</div>
              <div>{cateObj?.category}</div>
            </div>
          );
        })}
        <div className="text-center m-1 shadow-md">
          <div className="flex justify-center">
            <GrServices />
          </div>

          <div>{props.vendor._count?.products} services</div>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;
