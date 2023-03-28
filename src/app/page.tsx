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

      <CategoryList image="/assets/profile.svg" />

      <div className="w-screen flex justify-center">
        <Carousel />
      </div>

      <div>
        <h1 className="ml-[5rem] text-3xl text-oliveGreen font-bold">
          Top deal of the day
        </h1>
        <TopDealList />
      </div>

      <div>
        <h1 className="ml-[5rem] text-3xl text-oliveGreen font-bold">
          Highlight Services
        </h1>
        <ServiceList />
      </div>
    </div>
  );
}
