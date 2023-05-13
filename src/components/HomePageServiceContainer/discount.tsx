import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import LoadingSpinner from "../LoadingSpinner";
import { Discount } from "../../../Types";
import { NotFound } from "next/dist/client/components/error";
import useFetch from "@/Helper/ClientFetch/useFetch";

const SlideLeft = () => {
  let slider = document.getElementById("slider");
  if (slider) {
    slider.scrollLeft = slider.scrollLeft - 500;
  }
};
const SlideRight = () => {
  var slider = document.getElementById("slider");
  if (slider) {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0;
    } else {
      slider.scrollLeft += 500;
    }
  }
};

const Discount = () => {
  const { data, error, isLoading } = useFetch<Discount[]>(`service/discount`);
  if (isLoading) {
    return <div className="h-40 flex place-items-center">
      <LoadingSpinner text="Loading discount, please wait..." />
    </div>;
  }
  if (error && !data) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="flex flex-row items-center my-8 p-2 bg-white rounded-lg shadow-lg">
        <MdChevronLeft
          id="left"
          onClick={SlideLeft}
          size={150}
          className="cursor-pointer opacity-50 hover:opacity-100 hidden md:inline-block"
        />

        <div
          id="slider"
          className="flex items-center overflow-x-auto scroll-smooth whitespace-no-wrap md:scrollbar-hide "
        >
          <div className="inline-flex gap-8 items-center">
            {data?.map((discount) => {
              return <DiscountCard key={discount.id} discount={discount} />;
            })}
          </div>
        </div>
        <MdChevronRight
          id="right"
          size={150}
          onClick={SlideRight}
          className="cursor-pointer opacity-50 hover:opacity-100 hidden md:inline-block"
        />
      </div>
    </div>
  );
};

const DiscountCard = (props: { discount: Discount }) => {
  return (
    <div className="h-[10rem] w-[20rem] border-2 rounded-md p-2 m-2 border-oliveGreen">
      <div className="w-full h-full rounded-md flex">
        <div className="relative h-full w-full rounded-md">
          <Image
            src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.discount.image}
            alt={props.discount.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <div className="text-md italic px-2">
          <p className="text-xl font-bold line-clamp-1">
            {props.discount.name as string}
          </p>
          <p>Discount rate: {props.discount.amount as number}%</p>
          <p>
            Time Available: {new Date(props.discount.start).toDateString()} -{" "}
            {new Date(props.discount.end).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Discount;
