import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../Types";
import { useEffect, useRef, useState } from "react";
import useOnScreen from "@/Helper/ClientFetch/useOnScreen";
import LoadingSpinner from "components/LoadingSpinner";
import UpdateProductForm from "../Store/UpdateProductForm";

const Card = (props: { service: Product; display: boolean }) => {
  const img_endpoint = process.env.NEXT_PUBLIC_IMG_ENDPOINT;
  const cardRef = useRef(null);
  const isCardVisible = useOnScreen(cardRef);
  const [cardReady, setCardReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isCardVisible) {
      setCardReady(true);
    }
  }, [isCardVisible]);
  return (
    <div
      className="flex flex-col w-full h-full shadow-xl rounded-xl my-4 transition-all border
        hover:bg-white"
      ref={cardRef}
    >
      {cardReady ? (
        <div>
          <Link href={`/detail/${encodeURIComponent(props.service.id)}`}>
            <div className="relative w-full h-[15rem] rounded-t-md">
              <Image
                className="object-cover rounded-t-md"
                src={`${img_endpoint}${props.service.images[0]}`}
                alt={props.service.name}
                loading={"lazy"}
                placeholder="blur"
                blurDataURL={"/assets/background_authenticate.svg"}
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>
            <div className="flex flex-[1] flex-col m-5">
              <h1 className="text-xl text-black font-bold truncate">
                {props.service.name}
              </h1>
              <p>{props.service.category}</p>
              <div>
                <p className="line-clamp-2 h-12">{props.service.address}</p>
              </div>
            </div>
            <div className="flex flex-row flex-[1] m-5 items-center border-t">
              <div className="text-oliveGreen font-bold my-3 text-2xl pr-1">
                {props.service.price?.toLocaleString()} VND
              </div>
            </div>
          </Link>

          <UpdateProductForm product={props.service} display={props.display} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Card;
