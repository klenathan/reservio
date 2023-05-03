"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import UserProfile from "@/components/Profile";
import HistoryPage from "@/components/History";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Vendor Profile</title>
      </Head>
      <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
        <div className="md:pr-12"> 
        <UserProfile userName="asd" email="ads" phone="as"/>
        </div>
        <div className="flex flex-col ">
          <HistoryPage> </HistoryPage>
        </div>
      </div>
    </div>
  );
}
