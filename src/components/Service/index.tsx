import { services } from "@/data/service";
import Service from "./service";

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 place-items-center ">
      {services.map((service) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default ServiceList;
