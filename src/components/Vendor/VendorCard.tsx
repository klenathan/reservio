import Link from "next/link";
import { Vendor } from "../../../Types";

const VendorCard = (props: { vendor: Vendor }) => {
  return (
    <Link
      href="/"
      className="flex flex-col justify-center w-full shadow-xl rounded-md my-8  "
    >
      <div>{props.vendor.name}</div>
      <div>{props.vendor.username}</div>
      <div>{props.vendor._count?.products}</div>
    </Link>
  );
};

export default VendorCard;
