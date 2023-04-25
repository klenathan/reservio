"use client";
import ServiceList from "components/HomePageServiceContainer/homepageServiceContainer";
import Store from "components/Store";
import { StoreData } from "@/data/store";
import Modal from "@/components/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import AddProduct from "@/components/Store/AddProduct";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex items-center flex-col max-w-7xl mx-auto">
      <Store store={StoreData[0]} />

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

      <ServiceList />
    </div>
  );
};

export default Page;
