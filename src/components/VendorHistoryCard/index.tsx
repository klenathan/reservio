import Image from "next/image";
import Link from "next/link";


interface IVendorCardProps {
  userName: string;
  status: string;
  productName: string;
  price: number;
  totalPrice: number;
  statusColor: string;
}


const VendorHistoryCard = (props: any) => {

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

        <div className={`absolute top-3 right-3 p-1 rounded-md backdrop-blu status-border status-${props.statusColor}`}> 
          <p className={`font-bold uppercase text-${props.statusColor}`}>{props.status}</p>
        </div>
      </div>

      <div className="break-words p-3 pl-1 pt-1 md:p-6 md:pl-2 md:pt-1 flex flex-col justify-between  ">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
         
          <a href="#" className="text-base md:text-xl font-bold ">
            Username: {props.userName}
          </a>
          <div className="relative w-[1rem] h-[1rem] ml-1">
            <Image
              src="/assets/profile.svg"
              fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="Profile Hamburger"
              className="px-0 object-cover"
            />
          </div>
          </div>
          <a href="#" className="text-base md:text-xl font-bold">
          {props.productName}
          </a>
          <h1 className="font-medium text-xs">
            <span className="text-xs md:text-xl font-medium text-midGreen">
            ₫{props.price}
            </span>
          </h1>
        </div>
        <div className="font-extrabold text-gray-600 md:text-base pt-3">
          Total with taxes:
          <span className="text-xl md:text-2xl font-extrabold text-midGreen ml-3">
            ₫{props.totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
export default VendorHistoryCard;
