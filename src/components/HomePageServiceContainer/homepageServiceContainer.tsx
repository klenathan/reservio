import LoadingSpinner from "../LoadingSpinner";
import { Product } from "../../../Types";
import Card from "../Card/index";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { NotFound } from "next/dist/client/components/error";
const HomePageServiceContainer = () => {
  const { data, error, isLoading } = useFetch<Product[]>(`service/highlight`);
  if (isLoading) {
    return (
      <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
        <LoadingSpinner text="Loading product data, please wait..." />
      </div>
    );
  }
  if (error && !data) {
    return <NotFound />;
  }

  return (
    <div>
      {data?.length != 0 ? (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl">
          {data?.map((service) => {
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
