"use client";
import UserProfile from "@/components/Profile";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NotFound } from "next/dist/client/components/error";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { User, Vendor } from "../../../../Types";
import VerifyPage from "@/components/ReservationVerifying";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  // const [userData, setUserData] = useState<any>();
  const [url, setUrl] = useState("/");
  const [loadingClientData, setLoadingClientData] = useState(true);

  useEffect(() => {
    const vendor = sessionStorage.getItem("userData");

    if (!vendor) return;

    const userData = JSON.parse(vendor);
    if (!userData) {
      return;
    }
    setUrl(`vendor/${userData.username}`);
    setLoadingClientData(false);
  }, []);

  const { data, error, isLoading } = useFetch<Vendor>(url);

  if (loadingClientData) {
    return <LoadingSpinner />;
  } else {
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
        {data.username ? (
          <div className="flex flex-col md:flex-row  md:pt-12 m-2 justify-center">
            <div className="lg:pr-12">
              <UserProfile user={data.user} />
            </div>
            <div className="flex flex-col w-full md:w-1/2 ">
              <VerifyPage reservation={data.reservations} />
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}
