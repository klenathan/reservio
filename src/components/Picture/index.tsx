import Image from "next/image";
import React from "react";

interface IPictureProps {
    src: string,
    frameStyle?: "avatar",
    event?: any
}

const Picture: React.FC<IPictureProps> = (props: IPictureProps) => {
    let style: {
        avatar: string;
    } = {
        avatar: "rounded-full object-cover"
    }
    return (
        <Image
            src={props.src}
            className={`${props.frameStyle ? style[props.frameStyle] : style["avatar"]}`}
            alt={props.src}
            fill={true}
            priority={true}
            quality={100}
            {...props.event}
        />

    )
}

export default Picture;