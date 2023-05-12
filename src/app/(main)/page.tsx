"use client";
import CategoryList from "@/components/CategoryServiceContainer/CategoryList";
import HomePageServiceContainer from "components/HomePageServiceContainer/homepageServiceContainer";
import TopDealContainer from "@/components/HomePageServiceContainer/discount";
import CarouselHomePage from "components/HomePageServiceContainer/CarouselHomePage";

export default function Home() {
  return (
    <div className="overflow-hidden min-h-screen">
      <CategoryList />

      <div className="w-screen">
        <CarouselHomePage />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className=" w-full text-xl text-center md:text-left md:text-3xl text-oliveGreen font-bold">
          Discounts
        </h1>
        <TopDealContainer />
      </div>

      <div className="flex items-center flex-col max-w-7xl mx-auto mb-8">
        <h1 className="w-full my-6 text-xl md:text-left text-center md:text-3xl text-oliveGreen font-bold ">
          Highlight Services
        </h1>
        <HomePageServiceContainer />
      </div>
    </div>
  );
}
