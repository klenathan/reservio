"use client";
import Store from "components/Store";
import Modal from "@/components/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { lazy, Suspense, useState } from "react";
import AddProduct from "@/components/Store/AddProduct";
import { Vendor } from "../../../../../Types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NotFound } from "next/dist/client/components/error";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { useAuth } from "@/components/Auth/Context/AuthContext";

const Card = lazy(() => import("@/components/Card"));

const Page = (slugs: any) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useFetch<Vendor>(
    `vendor/${slugs.params.id}`
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
        <LoadingSpinner text="Loading store, please wait..." />
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  if (data) {
    return (
      <div className="flex items-center flex-col max-w-7xl mx-auto">
        <Store store={data} />

        <div className="flex justify-between w-full">
          <h1 className="text-3xl text-oliveGreen font-bold ">Services</h1>

          {user?.id === data.user.id && (
            <>
              <button onClick={handleOpenModal}>
                <AiOutlinePlusCircle size={30} />
              </button>
              {isModalOpen && (
                <Modal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  nameModal={"Add New Product"}
                >
                  <div
                    className={
                      "overflow-auto h-[calc(100vh_-_10rem)] space-y-4 py-6 px-1.5 md:px-6 lg:px-10 snap-both snap-mandatory scroll-smooth "
                    }
                  >
                    <AddProduct />
                  </div>
                </Modal>
              )}
            </>
          )}
        </div>

        <div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl pb-4">
            {data.products.map((service) => {
              return (
                <Suspense key={service.id} fallback={<LoadingSpinner />}>
                  <Card service={service} display={true} />
                </Suspense>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
