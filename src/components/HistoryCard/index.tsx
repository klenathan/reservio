import Image from "next/image";
import Link from "next/link";
import { IService } from "../Service/serviceInterface";

const HistoryCard = (props: { service: IService }) => {
  const size = 70;
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row items-center pr-10">
        <Image
          priority
          src="/assets/profile.svg"
          height={size}
          width={size}
          alt="Profile Hamburger"
        />
        <div>
          <a href="#" className="font-bold text-xl">
            RMIT HOUSE{" "}
          </a>
        </div>
      </div>

      <div>
        <a href="#" className="text-2xl font-bold">DALAT HOMESTAY with beautiful view </a>
        <div className="grid grid-cols-4 w-full ">
          <div>rating</div>
          <div>300 reviews</div>
          <span> Certified vendor</span>
          <div>Location</div>
        </div>
        <div>
          <Image
            src="/assets/background_authenticate.svg"
            className="animate-fadeIn "
            alt="..."
            height={50}
            width={500}
          />
        </div>
        <div className="font-extrabold text-gray-600 text-xl mt-5">Total with taxes:  <span className="text-3xl font-extrabold text-midGreen ml-2">₫5.500.000</span></div>
      </div>
    </div>
  );
};

export default HistoryCard;
