import Image from "next/image";
import Link from "next/link";

interface IHistoryCardProps {
  rid: string;
  id: string;
  vendorName: string;
  status: string;
  productName: string;
  productImage: string;
  price: number;
  totalPrice: number;
  statusColor: string;
  vendorAva: string;
}

const HistoryCard: React.FC<IHistoryCardProps> = (props: IHistoryCardProps) => {
  return (
    <div
      className={`flex mt-4 border-2 flex-col  w-full shadow-lg cursor-pointer py-4 px-4 rounded-md  border-${props.statusColor}`}
    >
      <div className="flex flex-row items-center justify-between mb-3">
        <div className="flex flex-row items-center w-4/5">
          <div className="relative min-w-[2rem] min-h-[2rem] mr-2">
            <Image
              src={props.vendorAva}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt={props.vendorName}
              className="px-0 object-cover rounded-full"
            />
          </div>

          <Link
            href={`/store/${encodeURIComponent(props.vendorName)}`}
            className="font-[900] text-base md:text-xl truncate  mr-3"
          >
            {props.vendorName}
          </Link>
        </div>
        <div>
          <h1
            className={`pr-3 text-sm md:text-base font-bold uppercase text-${props.statusColor}`}
          >
            {props.status}
          </h1>
        </div>
      </div>
      <Link
        href={`/reservationStatus/${encodeURIComponent(props.rid)}`}
        className="text-base md:text-xl font-bold"
      >
        <div className="flex md:flex-row flex-col">
          <div className="relative md:w-[20rem]  h-[10rem] md:h-[15rem]   rounded-t-md">
            <Image
              src={props.productImage}
              className="animate-fadeIn object-cover"
              alt={props.id}
              fill
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            />
          </div>
          <div className="break-words pl-3 flex flex-col justify-between ">
            <div>
              <div className="text-base md:text-xl font-bold">
                {props.productName}
              </div>
              <h1 className="font-light text-xs">
                Price:
                <span className="text-xs md:text-xl font-medium text-midGreen mx-2">
                  {props.price?.toLocaleString()}
                </span>
              </h1>
            </div>
            <div className="font-extrabold text-gray-600 md:text-xl mb-2">
              Total:
              <span className="text-xl md:text-3xl font-extrabold text-midGreen mx-2">
                {props.totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HistoryCard;
