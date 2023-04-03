import React from "react";
import { IService } from "../Service/serviceInterface";
import Image from "next/image";

const ImageDisplay = (props: { service: IService }) => {
  if (props.service.image.length < 3) {
    return (
      <div className="flex justify-center">
        {props.service.image.map((img, index) => {
          return (
            <Image src={img} key={index} alt={img} height={500} width={500} />
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <Image
        src={props.service.image[0]}
        alt={props.service.image[0]}
        height={500}
        width={500}
      />

      <div className="">
        {props.service.image.map((img, index) => {
          if (index > 0) {
            return (
              <Image src={img} key={index} alt={img} height={500} width={500} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ImageDisplay;
