import { useEffect, useState } from "react";
import { services } from "@/data/service";
import Image from "next/image";
import axios from "axios";

import ServiceCard from "../Card/index";
import { IService } from "./serviceInterface";
import SyncLoader from "react-spinners/SyncLoader";

const ServiceList = () => {
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
        <div className="flex flex-col w-full my-8 items-center justify-center gap-5">
          <SyncLoader loading={queryService.length == 0} color="#59981A" />
          <p className="text-oliveGreen font-semibold">Loading, please wait</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
