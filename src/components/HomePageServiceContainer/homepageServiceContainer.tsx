import LoadingSpinner from "../LoadingSpinner";
import { Product } from "../../../Types";
import Card from "../Card/index";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { NotFound } from "next/dist/client/components/error";
const HomePageServiceContainer = () => {
  const { data, error, isLoading } = useFetch<Product[]>(`service/highlight`);
  if (isLoading) {
    return <LoadingSpinner text="Loading highlight service, please wait..." />;
  }
  if (error && !data) {
    return <NotFound />;
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl">
      {data?.map((service) => {
        return <Card key={service.id} service={service} display={false} />;
      })}
    </div>
  );
};

export default HomePageServiceContainer;
