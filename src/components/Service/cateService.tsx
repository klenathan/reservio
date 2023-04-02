import { services } from "@/data/service";
import Service from "./service";

const CateService = () => {
  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default CateService;
