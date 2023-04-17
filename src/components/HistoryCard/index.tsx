import Image from "next/image";
import Link from "next/link";
import { IService } from "../Service/serviceInterface";

const HistoryCard = (props: any) => {
  const size = 55;
  return (
    //ml-80 just for testing, will be
    <div className="flex flex-col mt-3 w-full shadow-lg p-5 ">
      <div className="flex flex-row items-center justify-between mb-3">
        <div className="flex flex-row items-center ">
          <Image
            src="/assets/profile.svg"
            height={size}
            width={size}
            alt="Profile Hamburger"
            className="px-0"
          />
          <div>
            <a href="#" className="font-[900] text-xl">
              RMIT HOUSE{" "}
            </a>
          </div>
        </div>
        <div>
          <h1 className="pr-3"> STATUS </h1>
        </div>
      </div>

      <div>
        <div className="flex flex-row">
          <Image
            src="/assets/background_authenticate.svg"
            className="animate-fadeIn "
            alt="..."
            height={50}
            width={400}
          />
          <div className="pl-3 flex flex-col justify-between ">
            <div>
              <a href="#" className="text-xl font-bold">
                DALAT HOMESTAY with beautiful view{" "}
              </a>
              <h1 className="font-medium"> Price: <span className="text-xl font-medium text-midGreen"> ₫5.000.000 </span> </h1>
            </div>
            <div className="font-extrabold text-gray-600 text-xl">
              Total with taxes:{" "}
              <span className="text-3xl font-extrabold text-midGreen ml-3">
                ₫5.500.000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
