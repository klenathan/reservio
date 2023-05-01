import Image from "next/image";

interface ServiceCardProps {
    service?: any;
}

function Test(props: ServiceCardProps) {
    const {service} = props;
    console.log(service)

    return (
        <div key={props.service} className={'relative h-96 w-full '}>
            <Image
                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service}
                alt={`Image ${props.service.alt}`}
                fill={true}
                // onClick={handleOpenModal}
                className="object-cover cursor-pointer"
                loading="lazy"
            />
        </div>
)
;
}

export default Test