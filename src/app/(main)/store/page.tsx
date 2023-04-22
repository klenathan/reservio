"use client";
import ServiceList from "components/HomePageServiceContainer/homepageServiceContainer";
import Store from "components/Store";
import { StoreData } from "@/data/store";

const Page = () => {
  return (
    <div className="flex items-center flex-col max-w-7xl mx-auto">
      <Store store={StoreData[0]} />
      <h1 className="w-full text-3xl text-oliveGreen font-bold ">Services</h1>
      <ServiceList />
    </div>
  );
};

export default Page;
