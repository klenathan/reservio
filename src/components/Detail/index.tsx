import React from "react";
import Geocoder from "../Map/geocoder";
import { IService } from "../Service/serviceInterface";
import ImageDisplay from "./imageDisplay";

const DetailPage = (props: { service: IService }) => {
  return (
    <div>
      <h1 className="ml-[5rem] text-3xl text-oliveGreen font-bold">
        {props.service.name}
      </h1>
      <ImageDisplay service={props.service} />
      <Geocoder />
    </div>
  );
};

export default DetailPage;
