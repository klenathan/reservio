"use client";
import Breadcrumb from "components/Breadcrumb";
import {useEffect, useState} from "react";
import DetailPage from "components/Detail";
import {NotFound} from "next/dist/client/components/error";
import apiClient from "@/config/axios.config";
import {Product} from "../../../../../Types";

interface DetailParams {
    params: {
        id: string;
    };
}

export default function Detail(slugs: DetailParams) {
    const [product, setProduct] = useState<Product>();
    // const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false);

    const items = [
        {label: "Home", href: "/"},
        {label: product?.category, href: `/category?id=${product?.category}`},
        {label: product?.name, href: "/"},
    ];

    // TODO: Optimize the page loading and not found
    useEffect(() => {
        apiClient
            .get(`service/${slugs.params.id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((e) => {
                setIsError(true);
            });
    }, [slugs.params.id]);

    if (!product && !isError) {
        // return <div
        //     className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
        //     <LoadingSpinner text="Loading product data, please wait..."/>
        // </div>;
        return <div
        >
            asdasdsad
        </div>;
    }

    if (isError || !product) {
        return <NotFound/>;
    }

    return (
        <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
            <Breadcrumb items={items}/>
            <DetailPage service={product}/>
        </div>
    );
}
