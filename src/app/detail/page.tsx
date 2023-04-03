"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import DetailPage from "@/components/Detail";
import { services } from "@/data/service";

export default function Detail() {
  return (
    <div className="h-full">
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
      <DetailPage service={services[0]} />
    </div>
  );
}
