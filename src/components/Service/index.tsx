import { services } from "@/data/service";
import Service from "./service";

const ServiceList = () => {
  return (
    <div className="grid grid-cols-4 place-items-center">
      {services.map((service, index) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default ServiceList;
