"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import ReservationStatus  from "@/components/ReservationStatus";


export default function Profile() {
  return (
    <div>
      <Head>
        <title>Reservation status</title>
      </Head>
      <NavBar/>
      <div className="px-10">
        <ReservationStatus/>
      </div>

      </div>
  );
}
