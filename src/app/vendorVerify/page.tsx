"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import UserProfile from "@/components/Profile";
import VerifyPage from "@/components/ReservationVerifying";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Vendor Profile</title>
      </Head>
      <NavBar/>
      <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
        <div className="md:pr-12"> 
        <UserProfile> </UserProfile>
        </div>
        <div className="flex flex-col ">
          <VerifyPage> </VerifyPage>
          </div>
      </div>
    </div>
    )
}
