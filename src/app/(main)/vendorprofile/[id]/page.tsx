"use client";
import UserProfile from "@/components/Profile";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NotFound } from "next/dist/client/components/error";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { Vendor } from "../../../../../Types";
import VerifyPage from "@/components/ReservationVerifying";

export default function Profile(slugs: any) {
  const { data, error, isLoading } = useFetch<Vendor>(
    `vendor/${slugs.params.id}`
  );
  if (isLoading) {
    return (
      <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
        <LoadingSpinner text="Loading vendor page, please wait..." />
      </div>
    );
  }
  if (error || !data) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
        <div>
          <UserProfile user={data.user} />
        </div>
        <div className="flex flex-col ">
          <VerifyPage reservation={data.reservations} />
        </div>
      </div>
    </div>
  );
}
