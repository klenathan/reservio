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
      <NavBar> </NavBar>
      
      <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
        <UserProfile > </UserProfile>
        <div className="flex flex-col">
        <HistoryPage> </HistoryPage>
          <HistoryCard> </HistoryCard>
          <HistoryCard> </HistoryCard>
          <HistoryCard> </HistoryCard>
        </div>
      </div>
    </div>
  );
}
