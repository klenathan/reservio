import apiClient from "@/config/axios.config";
import { useEffect, useState } from "react";
import { Product } from "../../../Types";
import Service from "../Card";

const CateService = () => {
  const [queryService, setServices] = useState<Product[]>([]);
  useEffect(() => {
    apiClient.get("service").then((r) => {
      setServices(r.data);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl mx-6 ">
      {queryService.map((service) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default CateService;
