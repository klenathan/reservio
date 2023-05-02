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
            <div className="h-full px-4 md:px-8 2xl:px-56">
                <Breadcrumb items={items}/>
                <DetailPage service={data}/>
            </div>
        );
    }

}
