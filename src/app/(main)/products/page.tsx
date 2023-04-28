"use client";
import CategoryList from "@/components/CategoryServiceContainer/CategoryList";
import { useEffect, useState } from "react";
import { cities } from "@/data/city";
import Price from "components/CategoryServiceContainer/Price";
import Calendar from "components/CategoryServiceContainer/Calendar";
import apiClient from "@/config/axios.config";
import Card from "@/components/Card";
import { City, Product, Vendor } from "../../../../Types";
import SearchableDropdown from "@/components/SearchableDropdown";
import VendorCard from "@/components/Vendor/VendorCard";

export default function Category(slugs: any) {
  const [value, setValue] = useState<string>("");
  const [queryService, setServices] = useState<Product[]>([]);
  const [queryVendor, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    if (slugs.searchParams.category) {
      apiClient
        .get(`service/category/${slugs.searchParams.category}`)
        .then((res) => setServices(res.data));
    }
  }, [slugs.searchParams.category]);

  useEffect(() => {
    if (slugs.searchParams.keyword) {
      apiClient
        .get(`search?query=${slugs.searchParams.keyword}`)
        .then((res) => {
          setServices(res.data.products);
          setVendors(res.data.vendors);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [slugs.searchParams.keyword]);

  return (
    <div className="overflow-hidden">
      <CategoryList />

      <div className="min-h-3/4 flex">
        <aside className="flex-none h-3/4 p-4 mt-1 border border-black">
          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">By Date:</h1>
            <Calendar />
          </div>

          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              By Price:
            </h1>
            <Price />
          </div>

          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">By City:</h1>
            <SearchableDropdown
              options={cities as City}
              label="city"
              selectedVal={value}
              handleChange={(val: string) => setValue(val)}
            />
          </div>
        </aside>
        <div className="flex-1 min-w-0 overflow-auto">
          {queryVendor.length == 0 && queryService.length == 0 ? (
            <div>Not found!!!!!</div>
          ) : (
            ""
          )}
          {queryVendor.length > 0 ? (
            <div className="flex-1 w-full">
              <h1 className="text-xl text-oliveGreen font-bold mb-2">
                Vendor:
              </h1>
              <div className="max-w-7xl mx-6 ">
                {queryVendor.map((vendor) => {
                  return <VendorCard key={vendor.id} vendor={vendor} />;
                })}
              </div>
            </div>
          ) : (
            ""
          )}

          {queryService.length > 0 ? (
            <div className="flex-1 w-full">
              <h1 className="text-xl text-oliveGreen font-bold mb-2">
                Service:
              </h1>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl mx-6 ">
                {queryService.map((service) => {
                  return <Card key={service.id} service={service} />;
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
