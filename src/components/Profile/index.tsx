import Image from "next/image";
import { User } from "../../../Types";
import Button from "../Button";
import { useState } from "react";
import UpdateProfileForm from "../UpdateProfileForm";



const UserProfile = (props: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-row lg:flex-col justify-center items-center lg:border-2 p-2 pt-3 m-2 lg:shadow-md">
      <div className="relative w-[5rem] h-[5rem]">
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
      <div className="m-2">
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
      </div>
      <div className="my-2 ml-2">
      <UpdateProfileForm />
      </div>
    </div>
  );
};

export default UserProfile;
