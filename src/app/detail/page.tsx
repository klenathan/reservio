"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import DetailPage from "@/components/Detail";
import { services } from "@/data/service";
import NavBarSkeleton from "@/components/NavBar/skeleton";

export default function Detail() {
  return (
    <div >
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
      <DetailPage service={services[0]} />
    </div>
  );
}
