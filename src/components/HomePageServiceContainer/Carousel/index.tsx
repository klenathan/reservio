import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { IService } from "../serviceInterface";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import Link from "next/link";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [auto, setAuto] = useState(true);
  const [queryService, setServices] = useState<IService[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/service"
      )
      .then((r) => {
        setServices(r.data);
      });
  }, []);

  const timerRef = useRef<HTMLButtonElement | null>(null);
  const handleNextSlide = () => {
    let newSlide =
      currentSlide === queryService.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide =
      currentSlide === 0 ? queryService.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current as unknown as number);
    }

    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (auto) {
        let newSlide =
          currentSlide === queryService.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [auto, currentSlide, queryService.length]);

  return (
    <div className="mt-3 p-5 md:p-0">
      
      <div className="w-full md:w-4/5 flex justify-center overflow-hidden relative md:m-auto ">
      <button
        onClick={handlePrevSlide}
        className=" left-5 m-auto text-5xl inset-y-1/2 text-gray-400 z-20 md:mr-7"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30 ">
          <MdChevronLeft size={50} className="cursor-pointer text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
        {queryService.map((service, index) => {
          if (index === currentSlide) {
            return (
              <div key={service.id}>
                <CarouselProps carousel={service} />
              </div>
            );
          }
        })}
        <button
        ref={timerRef}
        onClick={handleNextSlide}
        className="right-5 m-auto text-5xl inset-y-1/2 text-gray-400 z-20"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
          <MdChevronRight size={50} className="cursor-pointer text-white" />
          <span className="sr-only">Next</span>
        </span>
      </button>
      </div>
      

      <div className="relative flex justify-center md:mt-5 mt-5">
        {queryService.map((_, index) => {
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
  const img_endpoint = "https://d3j45rkkmhyyrh.cloudfront.net/";
  return (
    <div className="lg:grid lg:grid-cols-3">
      <div className="flex justify-center lg:col-span-1">
        <Image
          src={`${img_endpoint}${props.carousel.images[0]}`}
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
        {/* <div className="font-medium">{props.carousel.time}</div> */}
        <p className="my-3 hidden lg:block">{props.carousel.desc}</p>
        <div className="text-midGreen font-bold my-3 text-2xl">
          {props.carousel.price?.toLocaleString()} VND
        </div>
        <Link
          href={`/detail/${encodeURIComponent(props.carousel.id)}`}
          className="flex flex-col w-1/3 shadow-xl rounded-md md:my-8 "
        > 
           <Button btnStyle="filled">Reserve Now</Button>
          
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
