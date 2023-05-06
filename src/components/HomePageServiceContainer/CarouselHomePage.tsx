import { useEffect, useState } from "react";
import { IService } from "components/HomePageServiceContainer/serviceInterface";
import apiClient from "@/config/axios.config";
import CarouselHomePageContent from "components/HomePageServiceContainer/CarouselHomePageContentProps";
import Carousel from "components/Carousel";
import LoadingSpinner from "../LoadingSpinner";

const CarouselHomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [queryService, setServices] = useState<IService[]>([]);

  useEffect(() => {
    apiClient
      .get("service/highlight")
      .then((r) => {
        setIsLoading(false);
        setServices(r.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
      
      
  }, []);

  return isLoading ? (
    <div className="flex items-center h-40">
      <LoadingSpinner />
    </div>
  ) : (
    // <div className="flex flex-col items-center w-full m-0">
    //   <CarouselHomePageContent service={queryService[0]}/>
    //   <CarouselHomePageContent service={queryService[1]}/>
    //   <CarouselHomePageContent service={queryService[2]}/>
    // </div>
    
    <Carousel slice={queryService} auto={true}>
      <CarouselHomePageContent />
    </Carousel>
  );
};

export default CarouselHomePage;
