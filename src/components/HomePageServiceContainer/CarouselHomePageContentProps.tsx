import Image from "next/image";
import Button from "components/Button";
import Link from "next/link";

interface CarouselHomePageContentProps {
  service?: any;
}

const CarouselHomePageContent = (props: CarouselHomePageContentProps) => {
  return (
    <div className="lg:flex max-w-7xl w-full">
      <div className="flex justify-center relative lg:flex-[2]">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service.images[0]}
          className="animate-fadeIn rounded md:rounded-none object-cover"
          alt="..."
          fill
        />
      </div>

      <div className="lg:m-10 flex flex-col items-center lg:flex-[3] lg:items-start">
        <h1 className="lg:text-3xl lg:text-left text-xl italic text-oliveGreen font-bold text-center">
          {props.service.name}
        </h1>
        <div className="font-medium">{props.service.address}</div>
        <p className="my-3 hidden lg:block">{props.service.desc}</p>
        <div className="text-midGreen font-bold my-3 text-2xl">
          {props.service.price?.toLocaleString()} VND
        </div>
        <Link
          href={`/detail/${encodeURIComponent(props.service.id)}`}
          className="flex flex-col w-1/3 shadow-xl rounded-md md:my-8 "
        >
          <Button btnStyle="filled">Reserve Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default CarouselHomePageContent;
