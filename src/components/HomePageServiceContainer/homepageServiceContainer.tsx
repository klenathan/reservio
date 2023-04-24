import {useEffect, useState} from "react";

import ServiceCard from "../Card/index";
import {IService} from "./serviceInterface";
import LoadingSpinner from "../LoadingSpinner";
import apiClient from "@/config/axios.config";

const HomePageServiceContainer = () => {
    const [queryService, setServices] = useState<IService[]>([]);
    useEffect(() => {
        apiClient
            .get(
                "service"
            )
            .then((r) => {
                setServices(r.data);
            });
    }, []);

    return (
        <div>
            {queryService.length != 0 ? (
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl">
                    {queryService.map((service) => {
                        return <ServiceCard key={service.id} service={service}/>;
                    })}
                </div>
            ) : (
                <LoadingSpinner/>
            )}
        </div>
    );
};

export default HomePageServiceContainer;
