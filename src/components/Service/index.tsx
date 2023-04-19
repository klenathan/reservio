import { services } from "@/data/service";
import Service from "../Card/index";

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 md:gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl p-5 ">
      {services.map((service) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default ServiceList;
