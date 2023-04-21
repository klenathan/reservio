"use client";
import Breadcrumb from "components/Breadcrumb";
import {useEffect, useState} from "react";
import {IService} from "components/HomePageServiceContainer/serviceInterface";
import Loading from "@/app/(main)/detail/loading";
import DetailPage from "components/Detail";
import {NotFound} from "next/dist/client/components/error";
import apiClient from "@/config/axios.config";

interface DetailParams {
    params: {
        id: string;
    };
}

export default function Detail(slugs: DetailParams) {
    const [data, setData] = useState<IService>();
    // const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false);

    const items = [
        {label: "Home", href: "/"},
        {label: data?.category, href: "/"},
        {label: data?.name, href: "/"},
    ];

    // TODO: Optimize the page loading and not found
    useEffect(() => {
        apiClient
            .get(
                `service/${slugs.params.id}`
            )
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log("Service" + e);
                setData(e);
                setIsError(true);
            });
    }, [slugs.params.id]);

    if (!data && !isError) {
        return <Loading/>;
    }

    if (isError) {
        return <NotFound/>;
    }

    return (
        <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
            <Breadcrumb items={items}/>
            {data ? <DetailPage service={data}/> : <Loading/>}
        </div>
    );
}
