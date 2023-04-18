import React from "react";
import Geocoder from "../Map/geocoder";
import {IService} from "../Service/serviceInterface";
import ImageGallery from "components/Detail/ImageGallery";
import DetailSubtitle from "components/Detail/DetailSubtitle";
import DetailInformation from "components/Detail/DetailImforamtion";

const DetailPage = (props: { service: IService }) => {
    return (
        <div>
            {/*Title*/}
            <h1 className="text-xl sm:text-2xl text-oliveGreen font-bold">
                {props.service.name}
            </h1>
            {/*Subtitle*/}
            <DetailSubtitle rating={5} reviewCount={200} location={"DaLat"} isCertified={true}/>

            {/*Display image*/}
            <ImageGallery images={props.service.image}/>

            <div className={"flex flex-col lg:flex-row w-full h-max mt-4"}>
                <div className={"lg:w-3/4 lg:pr-24"}>
                    <DetailInformation
                        name={props.service.name}
                        avatarUrl={props.service.image[0]}
                        description={props.service.description}
                        vendorName={"VendorName"}
                    />
                </div>
                <div className={"bg-neutral-200 md:w-1/4"}>Pricing components</div>
            </div>
            {/*TODO: [ADD] Map And add to cart*/}

            {/*<Geocoder/>*/}
        </div>
    )
        ;
};

export default DetailPage;
