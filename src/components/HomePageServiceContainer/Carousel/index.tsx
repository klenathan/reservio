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
    <div className="mt-3 p-5 md:p-0">
      <button
        onClick={handlePrevSlide}
        className="hidden lg:block absolute left-5 m-auto text-5xl inset-y-1/2 text-gray-400 z-20"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30 ">
          <MdChevronLeft size={50} className="cursor-pointer text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <div className="w-full md:w-4/5 flex justify-center overflow-hidden relative md:m-auto ">
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
        className="hidden lg:block absolute right-5 m-auto text-5xl inset-y-1/2 text-gray-400 z-20"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
          <MdChevronRight size={50} className="cursor-pointer text-white" />
          <span className="sr-only">Next</span>
        </span>
      </button>

      <div className="hidden relative lg:flex justify-center mt-5">
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
    <div className="lg:grid lg:grid-cols-3">
      <div className="flex justify-center lg:col-span-1">
        <Image
          src={props.carousel.images[0] as unknown as string}
          className="animate-fadeIn rounded md:rounded-none "
          alt="..."
          height={50}
          width={500}
        />
      </div>

      <div className="lg:m-10 flex flex-col items-center lg:col-span-2 lg:items-start">
        <h1 className="lg:text-3xl lg:text-left text-xl italic text-oliveGreen font-bold text-center">
          {props.carousel.name}
        </h1>
        <div className="font-medium">{props.carousel.address}</div>
        <div className="font-medium">{props.carousel.time}</div>
        <p className="my-3 hidden lg:block">{props.carousel.description}</p>
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
