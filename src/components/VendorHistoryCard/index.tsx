import Image from "next/image";
import Link from "next/link";

const VendorHistoryCard = (props: any) => {
  const size = 200;
  return (
    <div
      className="w-full md:w-full shadow-lg mb-3 mt-3 rounded-md
     m-auto"
    >
      <div className="relative w-full h-[15rem] rounded-t-md ">
        <Image
          src="/assets/background_authenticate.svg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="object-cover"
        />

        <div className="absolute top-3 right-3 border-midGreen border-2 p-1 rounded-md backdrop-blur">
          <p className="font-semibold text-midGreen">ACCEPTED</p>
        </div>
      </div>

      <div className="break-words p-3 pl-1 pt-1 md:p-6 md:pl-2 md:pt-1 flex flex-col justify-between  ">
        <div>
          <a href="#" className="text-base md:text-xl font-bold">
            DALAT HOMESTAY with beautiful view{" "}
          </a>
          <h1 className="font-medium text-xs">
            {" "}
            Price:{" "}
            <span className="text-xs md:text-xl font-medium text-midGreen">
              {" "}
              ₫5.000.000{" "}
            </span>{" "}
          </h1>
        </div>
        <div className="font-extrabold text-gray-600 md:text-base pt-3">
          Total with taxes:{" "}
          <span className="text-xl md:text-2xl font-extrabold text-midGreen ml-3">
            ₫5.500.000
          </span>
        </div>
      </div>
    </div>
  );
};
export default VendorHistoryCard;
