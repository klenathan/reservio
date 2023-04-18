import { services } from "@/data/service";
import axios from "axios";
import { useEffect, useState } from "react";
import Service from "../Card";
import { IService } from "./serviceInterface";

const CateService = () => {
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
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl mx-6 ">
      {queryService.map((service) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default CateService;
