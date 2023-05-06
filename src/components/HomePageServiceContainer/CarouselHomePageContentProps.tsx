import Image from "next/image";
import Button from "components/Button";
import Link from "next/link";

interface CarouselHomePageContentProps {
  service?: any;
}

const CarouselHomePageContent = (props: CarouselHomePageContentProps) => {
  // relative w-full flex-[1] flex justify-center h-[25vh] lg:flex-[2]
  return (
    <div className="gap-3 flex flex-col md:flex-row items-center md:max-w-7xl w-full">
      <div className="relative h-[25vh] w-full md:w-[40%] md:[10vh] ">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service.images[0]}
          className="animate-fadeIn object-cover"
          alt={props.service.name}
          fill
        />
      </div>

      <div
        className="gap-3 flex flex-col w-full items-center md:min-h-[60%] md:w-[50%] 
      lg:items-start "
      >
        <h1 className="lg:text-3xl lg:text-left text-xl italic text-oliveGreen font-bold text-center">
          {props.service.name}
        </h1>
        <div className="hidden md:block font-medium w-full max-w-[40vh] truncate">
          {props.service.address}
        </div>
        <p className="hidden md:block w-full overflow-hidden truncate">
          {props.service.desc}
        </p>
        <div className="text-midGreen font-bold my-3 text-2xl">
          {props.service.price?.toLocaleString()} VND
        </div>
        <Link
          href={`/detail/${encodeURIComponent(props.service.id)}`}
          className="flex flex-col w-1/2 md:w-1/3 shadow-xl rounded-md"
        >
          <Button btnStyle="filled">Reserve Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default CarouselHomePageContent;
