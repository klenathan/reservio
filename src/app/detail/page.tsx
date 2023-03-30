"use client";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import DetailPage from "@/components/Detail";

const inter = Inter({ subsets: ["latin"] });

export default function Detail() {
  return (
    <div className="h-full">
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
      <DetailPage />
    </div>
  );
}
