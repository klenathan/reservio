"use client";
import Breadcrumb from "components/Breadcrumb";
import DetailPage from "components/Detail";
import {NotFound} from "next/dist/client/components/error";
import LoadingSpinner from "components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import {Product} from "../../../../../Types";

interface DetailParams {
    params: {
        id: string;
    };
}

export default function Detail(slugs: DetailParams) {
    const {data, isError, isLoading} = useFetch<Product>(`service/${slugs.params.id}`)
    const items = [
        {label: "Home", href: "/"},
        {label: data?.category, href: `/category?id=${data?.category}`},
        {label: data?.name, href: "/"},
    ];


    if (isLoading) {
        return (
            <div
                className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
                <LoadingSpinner text="Loading product data, please wait..."/>
            </div>
        );
    }

    if (isError && !data) {
        return <NotFound/>;
    }

    if (data) {
        return (
            // md:px-8 lg:px-56
            <div className="h-full w-full flex justify-center px-4 md:px-0">
                <div className="w-full md:min-w-screen-lg xl:max-w-screen-xl 2k:max-w-screen-2xl">
                    <Breadcrumb items={items}/>
                    <DetailPage service={data}/>
                </div>
            </div>
        );
    }

}
