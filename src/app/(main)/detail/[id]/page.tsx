"use client";
import Breadcrumb from "components/Breadcrumb";
import React, {useEffect, useState} from "react";
import Loading from "@/app/(main)/detail/loading";
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
        {label: product?.category, href: "/"},
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
        return <Loading/>;
    }

    if (isError) {
        return <NotFound/>;
    }

    return (
        <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
            <Breadcrumb items={items}/>
            {product ? <DetailPage service={product}/> : <Loading/>}

        </div>
    );
}
