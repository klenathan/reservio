import Link from "next/link";
import { Vendor } from "../../../Types";
import Image from "next/image";
import { categories } from "@/const/Categories";
import { GrServices } from "react-icons/gr";

const VendorCard = (props: { vendor: Vendor }) => {
  const img_endpoint = process.env.NEXT_PUBLIC_IMG_ENDPOINT;
  return (
    <Link
      href={`/store/${props.vendor.username}`}
      className="relative flex flex-col md:justify-around
       justify-between shadow-xl rounded-lg my-8 text-center bg-white w-[50%] py-4"
    >
      <div className="m-4 flex items-center justify-center p-2 flex-col md:flex-row md:text-left">
        <div className="relative h-32 w-32">
          <Image
            src={`${img_endpoint}${props.vendor.user.avatar}`}
            alt={props.vendor.username}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="rounded-full object-cover"
          />
        </div>
        
      </div>
      <div className="m-2">
          <h1 className="text-l text-oliveGreen font-bold">
            {props.vendor.name}
          </h1>
          <p>@{props.vendor.username}</p>
          <p>{props.vendor.desc}</p>
        </div>
      <div className="flex justify-center items-center">
        {props.vendor.category.length > 0
          ? props.vendor.category.map((cate) => {
              let cateObj = categories.find((obj) => {
                return obj.id == cate;
              });
              return (
                <div key={cateObj?.id} className="text-center m-1 p-2 border rounded">
                  <div className="flex justify-center">{cateObj?.icon}</div>
                  <div>{cateObj?.category}</div>
                </div>
              );
            })
          : ""}
        <div className="text-center m-1 p-2 border rounded">
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
