"use client";
import CategoryList from "components/CategoryServiceContainer/Category";
import { useEffect, useState } from "react";
import { cities } from "@/data/city";
import Price from "components/CategoryServiceContainer/Price";
import Calendar from "components/CategoryServiceContainer/Calendar";
import apiClient from "@/config/axios.config";
import Card from "@/components/Card";
import LoadingSpinner from "@/components/LoadingSpinner";
import { City, Product } from "../../../../../Types";
import SearchableDropdown from "@/components/SearchableDropdown";
interface CategoryParams {
  params: {
    id: string;
  };
}
export default function Category(slugs: CategoryParams) {
  const [value, setValue] = useState<string>("");
  const [queryService, setServices] = useState<Product[]>([]);
  useEffect(() => {
    apiClient.get(`service/category/${slugs.params.id}`).then((r) => {
      console.log(r.data);
      setServices(r.data);
    });
  }, [slugs.params.id]);

  return (
    <div className="overflow-hidden">
      <CategoryList />

      <div className="flex">
        <aside className="w-72 fixed left-0 h-3/4 p-4 mt-1 border border-black">
          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              By Date:
            </h1>
            <Calendar />
          </div>

          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              By Price:
            </h1>
            <Price />
          </div>

          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              By City:
            </h1>
            <SearchableDropdown
              options={cities as City}
              label="city"
              selectedVal={value}
              handleChange={(val: string) => setValue(val)}
            />
          </div>
        </aside>
        {queryService.length != 0 ? (
          <div className="flex-1 ml-72">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl mx-6 ">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2 place-items-center max-w-7xl">
                {queryService.map((service) => {
                  return <Card key={service.id} service={service} />;
                })}
              </div>
              )
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
