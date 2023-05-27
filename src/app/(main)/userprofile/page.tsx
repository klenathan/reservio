"use client";
import UserProfile from "@/components/Profile";
import HistoryPage from "@/components/History";
import { NotFound } from "next/dist/client/components/error";
import LoadingSpinner from "@/components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { User } from "../../../../Types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Profile(slugs: any) {
  // const { data, error, isLoading } = useFetch<User>(`user/${slugs.params.id}`);

  const [url, setUrl] = useState<string | null>(null);
  const { data, error, isLoading } = useFetch<User>(url);
  const [sessionStorageErr, setSessionStorageErr] = useState(0);

  useEffect(() => {
    const user = sessionStorage.getItem("userData");

    if (!user) {
      setSessionStorageErr(1);
      return;
    }

    const userData = JSON.parse(user);

    if (!userData) {
      setSessionStorageErr(1);
      return;
    }
    setUrl(`/user/${userData.username}`);
  }, []);

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
    <div>
      {sessionStorageErr == 0 ? (
        <div className="flex flex-col md:flex-row  md:pt-12 m-2 justify-center">
          <div className="lg:pr-12">
            <UserProfile user={data} />
          </div>
          <div className="flex flex-col w-full md:w-3/5">
            {data.reservations && (
              <HistoryPage reservation={data.reservations} />
            )}
          </div>
        </div>
      ) : sessionStorageErr == 1 ? (
        <div className="h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center">
          <p className="text-2xl">
            You are not currently login, please{" "}
            <Link
              href="/login"
              className="text-midGreen text-2xl cursor-pointer hover:underline"
            >
              login
            </Link>
          </p>
        </div>
      ) : (
        <div className="h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center">
          <p className="text-2xl">Unknown Error, please contact support</p>
        </div>
      )}
    </div>
  );
}
