"use client";
import Store from "components/Store";
import Modal from "@/components/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import AddProduct from "@/components/Store/AddProduct";
import { Vendor } from "../../../../../Types";
import apiClient from "@/config/axios.config";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NotFound } from "next/dist/client/components/error";
import Card from "@/components/Card";

const Page = (slugs: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [store, setStore] = useState<Vendor>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    apiClient
      .get(`vendor/${slugs.params.id}`)
      .then((res) => {
        setStore(res.data);
      })
      .catch((e) => {
        setIsError(true);
      });
  }, [slugs.params.id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (!store && !isError) {
    return (
      <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
        <LoadingSpinner text="Loading store, please wait..." />
      </div>
    );
  }
  if (isError || !store) {
    return <NotFound />;
  }
  return (
    <div className="flex items-center flex-col max-w-7xl mx-auto">
      <Store store={store} />

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
            <AddProduct />
          </Modal>
        )}
      </div>

      <div>
        {store.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl">
            {store.products.map((service) => {
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
