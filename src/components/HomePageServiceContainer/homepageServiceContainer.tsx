import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import apiClient from "@/config/axios.config";
import { Product } from "../../../Types";
import Card from "../Card/index";
const HomePageServiceContainer = () => {
  const [queryService, setServices] = useState<Product[]>([]);
  useEffect(() => {
    apiClient.get("service/highlight").then((r) => {
      setServices(r.data);
    });
  }, []);

  return (
    <div>
      {queryService.length != 0 ? (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl">
          {queryService.map((service) => {
            return <Card key={service.id} service={service} />;
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default HomePageServiceContainer;
