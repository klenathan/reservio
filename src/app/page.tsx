"use client";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import CategoryList from "@/components/Category";
import Carousel from "@/components/Carousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
      <CategoryList image="/assets/profile.svg" />
      <div className="w-screen flex justify-center">
        <Carousel />
      </div>
    </div>
  );
}
