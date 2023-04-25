import React, {useState} from "react";
import dynamic from "next/dynamic";
import {geocoderFunction} from "@/Helper/Geocoder";
import DetailSubtitle from "components/Detail/DetailSubtitle";
import ImageGallery from "components/Detail/ImageGallery";
import DetailPageInfo from "components/Detail/DetailPageInfo";
import Picture from "components/Picture";
import {FaStar} from "react-icons/fa";
import Loading from "@/app/(main)/detail/loading";
import {Product} from "../../../Types";

const Map = dynamic(() => import("components/Map/Map"), {ssr: false});


const DetailPage = (props: { service: Product }) => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);

    const genGeocoder = async () => {
        return await geocoderFunction(props.service.address);
    };

    if (props.service.address) {
        genGeocoder().then((d) => {
            setLat(parseFloat(d[0].lat));
            setLng(parseFloat(d[0].lon));
        });
    }

    return (
        <div>
            {/*Title*/}
            <h1 className="text-xl sm:text-2xl text-oliveGreen font-bold">
                {props.service.name}
            </h1>
            {/*Subtitle*/}
            <DetailSubtitle
                rating={props.service.avgRating}
                reviewCount={props.service._count?.reservation}
                location={props.service.address}
                isCertified={props.service.vendor.certified}
            />

            {/*Display image*/}
            <ImageGallery images={props.service.images}/>

            {/*Detail information*/}
            <div className={"flex flex-col lg:flex-row w-full h-max mt-4"}>
                <div className={"lg:w-3/4 lg:pr-24"}>
                    <DetailPageInfo
                        name={props.service.name}
                        description={props.service.desc}
                        vendorName={props.service.vendor.username}
                        reviews={props.service.reviews}
                        avatar={props.service.vendor.user.avatar}
                    />
                </div>
                <div className={"bg-neutral-200 md:w-1/4"}>Pricing components</div>
            </div>

            {/*TODO: [ADD] add to cart*/}
            {/*Map*/}
            <div className={"border-b-2 border-gray-300 w-full pb-2 space-y-7 mt-7"}>
                <div className={"text-gray-700 font-bold text-2xl mb-3"}>
                    Where you will be here
                </div>
                <div className={"relative w-full h-80 lg:w-3/4 lg:h-96 m-auto z-0"}>
                    {lat !== null && lng !== null ? (
                        <Map latitude={lat} longitude={lng} scrollWheelZoom={false}/>
                    ) : (
                        <div className={"text-2xl text-center font-bold"}>
                            Map is not found 😭😭😭😭
                        </div>
                    )}
                </div>
            </div>

            {/*Vendor preview*/}
            {props.service.vendor ? (
                <div className={"flex flex-row  space-x-4 mt-7 h-36"}>
                    <div className={"w-20 h-20 relative"}>
                        <Picture
                            src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.service.vendor.user.avatar}
                        />
                    </div>
                    <div className={"flex flex-col "}>
                        <div className={"text-lg font-bold"}>
                            Service by {props.service.vendor.username}
                        </div>
                        <div>Joined since {props.service.vendor.createdAt}</div>
                        <div className="inline-flex items-center">
                            <FaStar className="mr-1"/>
                            <span>{props.service.avgRating}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </div>
    );
};

export default DetailPage;
