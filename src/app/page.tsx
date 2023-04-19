"use client";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import CategoryList from "@/components/Category";
import Carousel from "@/components/Carousel";
import ServiceList from "@/components/Service";
import TopDealList from "@/components/Service/topDeal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />

      <CategoryList />

      <Carousel />

      <div className="max-w-7xl mx-auto">
        <h1 className=" w-full text-xl text-center  md:text-left md:text-3xl text-oliveGreen font-bold">
          Top deal of the day
        </h1>
        <TopDealList />
      </div>

      <div className="flex items-center flex-col max-w-7xl mx-auto">
        <h1 className="w-full text-xl md:text-left text-center md:text-3xl text-oliveGreen font-bold ">
          Highlight Services
        </h1>
        <ServiceList />
      </div>
    </div>
  );
}
