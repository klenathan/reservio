import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { IService } from "../Service/serviceInterface";
import { services } from "@/data/service";

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
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <div className="w-4/5 flex overflow-hidden relative m-auto">
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
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
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
    <div className="flex">
      <Image
        src={props.carousel.image[0] as unknown as string}
        className="m-10 animate-fadeIn "
        alt="..."
        height={50}
        width={500}
      />
      <div className="m-10">
        <h1 className="text-3xl italic text-oliveGreen font-bold">
          {props.carousel.name}
        </h1>
        <div className="font-medium">{props.carousel.place}</div>
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
