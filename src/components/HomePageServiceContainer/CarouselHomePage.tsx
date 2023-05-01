import {useEffect, useState} from "react";
import {IService} from "components/HomePageServiceContainer/serviceInterface";
import apiClient from "@/config/axios.config";
import CarouselHomePageContent from "components/HomePageServiceContainer/CarouselHomePageContentProps";
import Carousel from "components/Carousel";


const CarouselHomePage = () => {
    const [queryService, setServices] = useState<IService[]>([]);

    useEffect(() => {
        apiClient
            .get(
                "service/highlight"
            )
            .then((r) => {
                setServices(r.data);
            });
    }, []);

    return (
        <Carousel slice={queryService}>
            <CarouselHomePageContent />
        </Carousel>
    )
}

export default CarouselHomePage