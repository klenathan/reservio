import Image from "next/image";

interface ServiceCardProps {
    service?: any;
    onClick?: () => void

}

const CarouselImage = (props: ServiceCardProps) => {
    return (
        <div key={props.service} className={'relative h-80 md:h-[25rem] w-full md:mr-5'}>
            <Image
                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service}
                alt={`Image ${props.service.alt}`}
                fill={true}
                quality={100}
                // priority={true}
                onClick={props.onClick}
                className="cursor-pointer w-full h-auto rounded-lg object-cover"
                loading={'lazy'}
            />
        </div>
    )
}

export default CarouselImage;