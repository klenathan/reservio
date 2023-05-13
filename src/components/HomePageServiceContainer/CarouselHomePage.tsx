import CarouselHomePageContent from "components/HomePageServiceContainer/CarouselHomePageContentProps";
import Carousel from "components/Carousel";
import LoadingSpinner from "../LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { Product } from "../../../Types";
import { NotFound } from "next/dist/client/components/error";

const CarouselHomePage = () => {
  const { data, error, isLoading } = useFetch<Product>(`service/highlight`);
  if (isLoading) {
    return (
      <div className="flex items-center h-72 ">
        <LoadingSpinner text="Loading carousel, please wait..." />
      </div>
    );
  }
  if (error && !data) {
    return <NotFound />;
  }
  return (
    <Carousel className="border-b py-4 border-gray-300 bg-white" slice={data} auto={true}>
      <CarouselHomePageContent />
    </Carousel>
  );
};

export default CarouselHomePage;
