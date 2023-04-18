import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { IService } from "../serviceInterface";
import { services } from "@/data/service";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [auto, setAuto] = useState(true);

  const timerRef = useRef<HTMLButtonElement | null>(null);
  const handleNextSlide = () => {
    let newSlide = currentSlide === services.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? services.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current as unknown as number);
    }

    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (auto) {
        let newSlide =
          currentSlide === services.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [auto, currentSlide]);

  return (
    <div className="relative">
      <button
        onClick={handlePrevSlide}
        className="absolute left-5 m-auto text-5xl inset-y-1/2 text-gray-400 z-20"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30 ">
          <MdChevronLeft size={50} className="cursor-pointer text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <div className="md:w-4/5 relative flex m-auto">
        {services.map((image, index) => {
          if (index === currentSlide) {
            return (
              <div key={image.id}>
                <CarouselProps carousel={image} />
              </div>
            );
          }
        })}
      </div>
      <button
        ref={timerRef}
        onClick={handleNextSlide}
        className="absolute right-5 m-auto text-5xl inset-y-1/2 text-gray-400 z-20"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
          <MdChevronRight size={50} className="cursor-pointer text-white" />
          <span className="sr-only">Next</span>
        </span>
      </button>

      <div className="relative flex justify-center p-2">
        {services.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-3 w-3 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-3 w-3 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const CarouselProps = (props: { carousel: IService }) => {
  return (
    <div className="flex max-w-9xl">
      <div className="lg:relative lg:flex lg:flex-1">
        <Image
          src={props.carousel.images[0] as unknown as string}
          alt="..."
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority
        />
      </div>
      <div className="invisible lg:m-10 lg:flex-1 lg:visible">
        <h1 className="text-3xl italic text-oliveGreen font-bold">
          {props.carousel.name}
        </h1>
        <div className="font-medium">{props.carousel.address}</div>
        <div className="font-medium">{props.carousel.time}</div>
        <p className="my-3">{props.carousel.description}</p>
        <div className="text-midGreen font-bold my-3 text-2xl">
          {props.carousel.price?.toLocaleString()} VND
        </div>
        <Button
          btnStyle="filled"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Reserve Now
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
