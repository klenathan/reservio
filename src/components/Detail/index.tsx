import React, { useEffect, useState } from "react";
import { IService } from "../HomePageServiceContainer/serviceInterface";
import ImageGallery from "components/Detail/ImageGallery";
import DetailSubtitle from "components/Detail/DetailSubtitle";
import DetailPageInfo from "./DetailPageInfo";
import Picture from "components/Picture";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import { geocoderFunction } from "@/Helper/Geocoder";

// TODO: [FIX] Map contianer is already intitialized when refreshs
const Map = dynamic(() => import("components/Map/map"), { ssr: false });

const DetailPage = (props: { service: IService }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    const genGeocoder = async () => {
      const data: any = await geocoderFunction("RMIT");
      const { lat, lon } = data[0];

      setLat(parseFloat(lat));
      setLng(parseFloat(lon));
    };
    genGeocoder();
  });

  return (
    <div>
      {/*Title*/}
      <h1 className="text-xl sm:text-2xl text-oliveGreen font-bold">
        {props.service.name}
      </h1>
      {/*Subtitle*/}
      <DetailSubtitle
        rating={5}
        reviewCount={200}
        location={"DaLat"}
        isCertified={true}
      />

      {/*Display image*/}
      <ImageGallery images={props.service.images} />

      {/*  Detail information*/}
      <div className={"flex flex-col lg:flex-row w-full h-max mt-4"}>
        <div className={"lg:w-3/4 lg:pr-24"}>
          <DetailPageInfo
            name={props.service.name}
            avatarUrl={props.service.images[0]}
            description={props.service.description}
            vendorName={"VendorName"}
          />
        </div>
        <div className={"bg-neutral-200 md:w-1/4"}>Pricing components</div>
      </div>

      {/*TODO: [ADD] Map And add to cart*/}
      {/*Map*/}
      <div className={"border-b-2 border-gray-300 w-full pb-2 space-y-7 "}>
        <div className={"text-gray-700 font-bold text-2xl mb-3"}>
          Where you will be here
        </div>
        <div className={"relative w-full h-80 lg:w-3/4 lg:h-96 m-auto "}>
          {lat !== null && lng !== null ? (
            <Map latitude={lat} longitude={lng} />
          ) : (
            <div>Map is not found 😭😭😭😭 </div>
          )}
        </div>
      </div>

      {/*Vendor preview*/}
      <div className={"flex flex-row  space-x-4 mt-7 h-36"}>
        <div className={"w-20 h-20 relative"}>
          <Picture src={props.service.images[0]} />
        </div>
        <div className={"flex flex-col "}>
          <div className={"text-lg font-bold"}>Service by Vendor name</div>
          <div>Joined since Vendor date</div>
          <div className="inline-flex items-center">
            <FaStar className="mr-1" />
            <span>Count rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
