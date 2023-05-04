import Image from "next/image";

interface ServiceCardProps {
    service?: any;
    onClick?: () => void

}

const CarouselImage = (props: ServiceCardProps) => {
    return (
        <div key={props.service} className={'relative h-72 md:h-96 w-full md:mr-5'}>
            <Image
                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service}
                alt={`Image ${props.service.alt}`}
                fill={true}
                quality={100}
                // priority={true}
                onClick={props.onClick}
                className="object-center cursor-pointer w-full h-auto rounded-lg"
                loading={'lazy'}
            />
        </div>
    )
}

export default CarouselImage;