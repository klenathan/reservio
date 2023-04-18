import { useEffect, useState } from "react";
import axios from "axios";

import ServiceCard from "../Card/index";
import { IService } from "./serviceInterface";
import LoadingSpinner from "../LoadingSpinner";

const HomePageServiceContainer = () => {
  const [queryService, setServices] = useState<IService[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/service"
      )
      .then((r) => {
        setServices(r.data);
      });
  }, []);

  return (
    <div>
      {queryService.length != 0 ? (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl ">
          {queryService.map((service) => {
            return <ServiceCard key={service.id} service={service} />;
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default HomePageServiceContainer;
