"use client";
import Store from "components/Store";
import Modal from "@/components/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import AddProduct from "@/components/Store/AddProduct";
import { Vendor } from "../../../../../Types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NotFound } from "next/dist/client/components/error";
import Card from "@/components/Card";
import useFetch from "@/Helper/ClientFetch/useFetch";

const Page = (slugs: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError, isLoading } = useFetch<Vendor>(
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
  if (isError || !data) {
    return <NotFound />;
  }
  return (
    <div className="flex items-center flex-col max-w-7xl mx-auto">
      <Store store={data} />

      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-oliveGreen font-bold ">Services</h1>
        <button onClick={handleOpenModal}>
          <AiOutlinePlusCircle size={30} />
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            nameModal={"Add New Product"}
          >
            <div className={"px-6 py-6"}>
              <AddProduct />
            </div>
          </Modal>
        )}
      </div>

      <div>
        {data.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl">
            {data.products.map((service) => {
              return <Card key={service.id} service={service} />;
            })}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default Page;
