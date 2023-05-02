import Image from "next/image";

interface ImageModalCarouselProps {
    service?: any
}

const ImageModalCarousel = (props: ImageModalCarouselProps) => {
    return (
        <div key={props.service} className={'relative aspect-auto w-screen h-80 md:h-96  md:mr-5'}>
            <Image
                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service}
                alt={`Image ${props.service.alt}`}
                fill={true}
                quality={100}
                // priority={true}
                className="object-fill object-center"
                loading={'lazy'}
            />
        </div>
    )
}

export default ImageModalCarousel