"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import UserProfile from "@/components/Profile";
import { services } from "@/data/service";
import HistoryPage from "@/components/History";
import VendorHistoryCard from "@/components/VendorHistoryCard";


export default function Profile() {
  return (
    <div>
      <Head>
        <title>Vendor Profile</title>
      </Head>
      {/* <NavBar> </NavBar> */}

      <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
        <UserProfile> </UserProfile>
        <div className="flex flex-col "> 
        <HistoryPage> </HistoryPage>
        </div>
        </div>
      </div>
  );
}
