import { services } from "@/data/service";
import Service from "../Card";

const CateService = () => {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl mx-6 ">
      {services.map((service, index) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default CateService;
