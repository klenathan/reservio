import React, {useEffect, useRef, useState} from "react";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import Image from "next/image";

interface CarouselProps {
    slice?: any;
    children?: React.ReactNode;
    auto: boolean
    preview?: true
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [auto, setAuto] = useState<boolean>(props.auto);
    const [queryService, setServices] = useState(props.slice);

    const timerRef = useRef<HTMLButtonElement | null>(null);

    // console.log(auto)

    useEffect(() => {
        setServices(props.slice);
    }, [props.slice]);
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
        //🔔 For optimize you must have the container when use 🐱
        <div className="mt-3 md:p-5">
            <div className="w-full flex justify-center overflow-hidden relative md:m-auto ">
                <button
                    onClick={handlePrevSlide}
                    className=" left-5 text-5xl inset-y-1/2 text-gray-400 z-20 md:mr-7"
                >
          <span className="hidden lg:inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30 ">
            <MdChevronLeft size={50} className="cursor-pointer text-white"/>
            <span className="sr-only">Previous</span>
          </span>
                </button>
                {queryService.map((service: [], index: number) => {
                    if (index === currentSlide) {
                        return React.Children.map(props.children, (child) => {
                            return React.cloneElement(child as React.ReactElement<any>, {
                                service,
                            });
                        });
                    }
                })}
                <button
                    ref={timerRef}
                    onClick={handleNextSlide}
                    className="right-5 text-5xl inset-y-1/2 text-gray-400 z-20  md:ml-7"
                >
          <span className="hidden lg:inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
            <MdChevronRight size={50} className="cursor-pointer text-white"/>
            <span className="sr-only">Next</span>
          </span>
                </button>
            </div>

            {/*Dot*/}
            {!props.preview ?
                <div className="relative flex justify-center md:mt-5 mt-5">
                    {queryService.map(
                        (
                            _: any,
                            index: string | number | ((prevState: number) => number)
                        ) => {
                            return (
                                <div
                                    className={
                                        index === currentSlide
                                            ? "h-3 w-3 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                                            : "h-3 w-3 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                                    }
                                    key={index as number}
                                    onClick={() => {
                                        setCurrentSlide(index as number);
                                    }}
                                />
                            );
                        }
                    )}
                </div>
                :
                /*Preview*/ // ⚠️ only use for image
                <div className="relative flex justify-center space-x-10  md:mt-5 mt-5">
                    {queryService.map(
                        (
                            service: any,
                            index: string | number | ((prevState: number) => number)
                        ) => {
                            return (
                                <div key={index as number} className={
                                    `${index === currentSlide
                                        ? "border-4 border-midGreen cursor-pointer"
                                        : "opacity-60"} `
                                }>
                                    <div key={service} className={'relative h-20 w-20'}>
                                        <Image
                                            src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + service}
                                            alt={`Image ${service.alt}`}
                                            fill={true}
                                            quality={100}
                                            onClick={() => {
                                                setCurrentSlide(index as number);
                                            }}
                                            className="object-center cursor-pointer w-full h-auto"
                                            loading={'lazy'}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            }
        </div>
    );
};

export default Carousel;
