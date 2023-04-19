"use client";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import CategoryList from "@/components/CategoryServiceContainer/Category";
import Carousel from "@/components/HomePageServiceContainer/Carousel";
import HomePageServiceContainer from "@/components/HomePageServiceContainer/homepageServiceContainer";
import TopDealContainer from "@/components/HomePageServiceContainer/topDeal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />

      <CategoryList />

      <div className="w-screen">
        <Carousel />
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="w-full text-3xl text-oliveGreen font-bold">
          {/* <Carousel />

      <div className="max-w-7xl mx-auto">
        <h1 className=" w-full text-xl text-center  md:text-left md:text-3xl text-oliveGreen font-bold"> */}
          Top deal of the day
        </h2>
        <TopDealContainer />
      </div>

      <div className="flex items-center flex-col max-w-7xl mx-auto">
        <h2 className="w-full text-3xl text-oliveGreen font-bold ">
          {/* <h1 className="w-full text-xl md:text-left text-center md:text-3xl text-oliveGreen font-bold "> */}
          Highlight Services
        </h2>
        <HomePageServiceContainer />
      </div>
    </div>
  );
}
