import React from "react";
import { IService } from "../HomePageServiceContainer/serviceInterface";
import Image from "next/image";

const ImageDisplay = (props: { service: IService }) => {
  if (props.service.images.length < 3) {
    return (
      <div className="flex justify-center">
        {props.service.images.map((img, index) => {
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
        src={props.service.images[0]}
        alt={props.service.images[0]}
        height={500}
        width={500}
      />

      <div className="">
        {props.service.images.map((img, index) => {
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
