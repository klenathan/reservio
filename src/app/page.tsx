"use client"
import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
    </div>
  );
}
