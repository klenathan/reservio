"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import ReservationStatus from "@/components/ReservationStatus";
import ReservationInfo from "@/components/ReservationInfo";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Reservation status</title>
      </Head>
      <NavBar />
      <div className="md:mx-24 mx-8 ">
        <ReservationStatus />
        <div className="mt-5"> 
        <ReservationInfo />
        </div>
      </div>
    </div>
  );
}
