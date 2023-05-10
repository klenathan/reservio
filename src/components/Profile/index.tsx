import Image from "next/image";
import Link from "next/link";
import { User } from "../../../Types";

const UserProfile = (props: { user: User }) => {
  return (
    <div className="flex flex-row md:flex-col justify-center items-center md:border-2 p-2 lg:shadow-md  ">
      <div className="relative w-[5rem] h-[5rem] ">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.user.avatar}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="Profile Hamburger"
          className="px-0 object-cover rounded-full"
        />
      </div>
      <div className="m-2 ">
        <div className="font-semibold text-midGreen">
          <span className="font-bold text-black"> Username: </span>
          {props.user.username}
        </div>
        <div className="font-semibold text-midGreen">
          <span className="font-bold text-black ">Email: </span>
          {props.user.email}
        </div>
        <div className="font-semibold text-midGreen">
          <span className="font-bold text-black ">Phone: </span>
          {props.user.phoneNo}
        </div>
        <Link
          href={`/store/${encodeURIComponent(props.user.username)}`}
          className="font-semibold text-midGreen hover:text-oliveGreen"
        >
          <span className="font-bold text-black">Store: </span>
          {props.user.vendor.name}
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
