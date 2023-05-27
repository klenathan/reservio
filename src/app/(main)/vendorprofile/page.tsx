"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NotFound } from "next/dist/client/components/error";
import UserProfile from "@/components/Profile";
import useFetch from "@/Helper/ClientFetch/useFetch";
import VerifyPage from "@/components/ReservationVerifying";
import { User, Vendor } from "../../../../Types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "@/components/Modal";
import NewVendorForm from "@/components/Vendor/NewVendorForm";

const errorCodes = {
  1: "Login",
  2: "Request to be a vendor",
};

export default function Profile() {
  const [url, setUrl] = useState("/");
  const { data, error, isLoading } = useFetch<Vendor>(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionStorageErr, setSessionStorageErr] = useState(0);

  useEffect(() => {
    const vendor = sessionStorage.getItem("userData");

    if (!vendor) {
      setSessionStorageErr(1);
      return;
    }

    const userData = JSON.parse(vendor);

    if (!userData) {
      setSessionStorageErr(1);
      return;
    }

    if (userData.vendor) {
      setUrl(`vendor/${userData.username}`);
    } else {
      setSessionStorageErr(2);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      {sessionStorageErr != 0 ? (
        sessionStorageErr == 1 ? (
          <div className="h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center">
            <p className="text-2xl">
              You are not a currently a vendor, please{" "}
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
            <p className="text-2xl">
              You are not a currently a vendor, please{" "}
              <button
                className=" text-midGreen hover:underline"
                onClick={handleOpenModal}
              >
                request new vendor
              </button>
            </p>
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                nameModal={"Create Your Own Store"}
              >
                <div className={"px-6 py-6"}>
                  <NewVendorForm />
                </div>
              </Modal>
            )}
          </div>
        )
      ) : data.username ? (
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
