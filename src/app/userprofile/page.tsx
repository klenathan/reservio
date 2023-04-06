"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import UserProfile from "@/components/Profile";
import { services } from "@/data/service";
import HistoryPage from "@/components/History";
import HistoryCard from "@/components/HistoryCard";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <NavBar />
      <div className="flex flex-col place-items-start">
        <div className="flex flex-row mt-12 justify-center w-full ">
          {/* <UserProfile> </UserProfile> */}
          <HistoryPage> </HistoryPage>
        </div>
        <div>
          <HistoryCard> </HistoryCard>
        </div>
      </div>
    </div>
  );
}
