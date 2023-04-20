import React, {useEffect, useState} from "react";
import {IService} from "../HomePageServiceContainer/serviceInterface";
import dynamic from "next/dynamic";
import {geocoderFunction} from "@/Helper/Geocoder";
import DetailSubtitle from "components/Detail/DetailSubtitle";
import ImageGallery from "components/Detail/ImageGallery";
import DetailPageInfo from "components/Detail/DetailPageInfo";
import Picture from "components/Picture";
import {FaStar} from "react-icons/fa";
import axios from "axios";
import Loading from "@/app/detail/loading";

// TODO: [FIX] Map contianer is already intitialized when refreshs
const Map = dynamic(() => import("components/Map/map"), {ssr: false});


interface VendorInfoProps {
    avatar: string,
    createdAt: string,
}

const DetailPage = (props: { service: IService }) => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [vendorInfo, setVendorInfo] = useState<VendorInfoProps>()
    const [isError, setIsError] = useState(false)

    const genGeocoder = async () => {
        return await geocoderFunction('RMIT')
    };

    if (props.service.address) {
        genGeocoder().then((d) => {
            setLat(parseFloat(d[0].lat));
            setLng(parseFloat(d[0].lon));
        });
    }

    useEffect(() => {
        genGeocoder().then((d) => {
            setLat(parseFloat(d[0].lat));
            setLng(parseFloat(d[0].lon));
        });

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}user/${props.service.vendorUsername}`)
            .then((res) => {
                console.log(res)
                setVendorInfo({
                    avatar: res.data.avatar,
                    createdAt: res.data.createdAt
                })
            }).catch((e) => {
            setIsError(true)
            console.log(e)
        })

    }, []);


    return (
        <div>
            {/*Title*/}
            <h1 className="text-xl sm:text-2xl text-oliveGreen font-bold">
                {props.service.name}
            </h1>
            {/*Subtitle*/}
            <DetailSubtitle
                rating={props.service._count?.reviews}
                reviewCount={props.service._count?.reservation}
                location={props.service.address}
                isCertified={true}
            />

            {/*Display image*/}
            <ImageGallery images={props.service.images}/>

            {/*Detail information*/}
            <div className={"flex flex-col lg:flex-row w-full h-max mt-4"}>
                <div className={"lg:w-3/4 lg:pr-24"}>
                    <DetailPageInfo
                        name={props.service.name}
                        description={props.service.desc}
                        vendorName={props.service.vendorUsername}
                        // review={props.service.reviews}
                        avatar={vendorInfo?.avatar}
                    />
                </div>
                <div className={"bg-neutral-200 md:w-1/4"}>Pricing components</div>
            </div>

            {/*TODO: [ADD] add to cart*/}
            {/*Map*/}
            <div className={"border-b-2 border-gray-300 w-full pb-2 space-y-7 "}>
                <div className={"text-gray-700 font-bold text-2xl mb-3"}>
                    Where you will be here
                </div>
                <div className={"relative w-full h-80 lg:w-3/4 lg:h-96 m-auto z-0"}>
                    {lat !== null && lng !== null ? (
                        <Map latitude={lat} longitude={lng}/>
                    ) : (
                        <div className={'text-2xl text-center font-bold'}>Map is not found 😭😭😭😭 </div>
                    )}
                </div>
            </div>

            {/*Vendor preview*/}
            {vendorInfo ? <div className={"flex flex-row  space-x-4 mt-7 h-36"}>
                <div className={"w-20 h-20 relative"}>
                    <Picture src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + vendorInfo.avatar}/>
                </div>
                <div className={"flex flex-col "}>
                    <div className={"text-lg font-bold"}>Service by {props.service.vendorUsername}</div>
                    <div>Joined since {vendorInfo.createdAt}</div>
                    <div className="inline-flex items-center">
                        <FaStar className="mr-1"/>
                        <span>Count rating</span>
                    </div>
                </div>
            </div> : <Loading/>}

        </div>
    );
};

export default DetailPage;
