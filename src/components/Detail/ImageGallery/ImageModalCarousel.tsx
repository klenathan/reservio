import Image from "next/image";

interface ImageModalCarouselProps {
    service?: any
}

const ImageModalCarousel = (props: ImageModalCarouselProps) => {
    return (
         // md:min-w-screen-lg xl:max-w-screen-xl 2k:max-w-screen-2xl
        <div key={props.service} className={'relative w-screen h-[calc(100vh_-_20rem)] md:mr-5'}>
            <Image
                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service}
                alt={`Image ${props.service.alt}`}
                fill={true}
                quality={100}
                // priority={true}
                className="object-contain"
                loading={'lazy'}
            />
        </div>
    )
}

export default ImageModalCarousel