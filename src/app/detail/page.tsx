'use client'
import NavBar from "@/components/NavBar";
import Head from "next/head";
import DetailPage from "@/components/Detail";
import {services} from "@/data/service";
import Breadcrumb from "components/Breadcrumb";

export default function Detail() {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/' },
        { label: services[0].name, href: '/' },
    ]
    return (
        <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
            <Head>
                <title>Reservio</title>
            </Head>
            <NavBar/>
            <Breadcrumb items={items} />
            <DetailPage service={services[0]} />
        </div>
    );
}