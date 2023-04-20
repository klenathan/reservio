'use client'
import NavBar from "@/components/NavBar";
import Head from "next/head";
import Breadcrumb from "components/Breadcrumb";
import {useEffect, useState} from "react";
import axios from "axios";
import {IService} from "components/HomePageServiceContainer/serviceInterface";
import Loading from "@/app/detail/loading";
import DetailPage from "components/Detail";

interface DetailParams {
    params: {
        id: string
    }
}

export default function Detail(slugs: DetailParams) {
    const [data, setData] = useState<IService>()

    const items = [
        {label: 'Home', href: '/'},
        {label: data?.category, href: '/'},
        {label: data?.name, href: '/'},
    ]


    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}service/${slugs.params.id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((e) => {
                console.log('Service' + e)
            })
    }, [])

    return data ? (
        <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
            <Head>
                <title>Reservio</title>
            </Head>
            <NavBar/>
            <Breadcrumb items={items}/>
            <DetailPage service={data}/>
        </div>
    ) : <Loading/>;
}