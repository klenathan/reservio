"use client";
import NavBar from "@/components/NavBar";
import ServiceList from "@/components/HomePageServiceContainer/homepageServiceContainer";
import Store from "@/components/Store";
import { StoreData } from "@/data/store";
import Head from "next/head";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
      <div className="flex flex-col justify-center">
        <Store store={StoreData[0]} />
        <div className="flex items-center flex-col max-w-7xl mx-auto">
          <h1 className="w-full text-3xl text-oliveGreen font-bold ">
            Services
          </h1>
          <ServiceList />
        </div>
      </div>
    </div>
  );
};

export default Page;
