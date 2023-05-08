"use client";
import UserProfile from "@/components/Profile";
import HistoryPage from "@/components/History";
import { NotFound } from "next/dist/client/components/error";
import LoadingSpinner from "@/components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { User } from "../../../../../Types";

export default function Profile(slugs: any) {
  const { data, error, isLoading } = useFetch<User>(`user/${slugs.params.id}`);
  if (isLoading) {
    return (
      <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
        <LoadingSpinner text="Loading profile page, please wait..." />
      </div>
    );
  }
  if (error || !data) {
    return <NotFound />;
  }
  return (
    <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
      <div className="lg:pr-12">
        <UserProfile user={data} />
      </div>
      <div className="flex flex-col">
        <HistoryPage reservation={data.reservations} />
      </div>
    </div>
  );
}
