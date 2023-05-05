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
import Form from "@/components/Form";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFromInput {
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
}
export default function Category(slugs: any) {
  const [value, setValue] = useState<string>("");
  const [queryService, setServices] = useState<Product[]>([]);
  const [queryVendor, setVendors] = useState<Vendor[]>([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFromInput>();

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

  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    let minPrice = data.minPrice ? data.minPrice : "";
    let maxPrice = data.maxPrice ? data.maxPrice : "";
    let category = slugs.searchParams.category
      ? slugs.searchParams.category
      : "";
    let fromDate = data.fromDate ? data.fromDate : "";
    let toDate = data.toDate ? data.toDate : "";
    apiClient
      .get(
        `/service?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&fromDate=${fromDate}&toDate=${toDate}`
      )
      .then((res) => setServices(res.data))
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="overflow-hidden">
      <CategoryList />

      <div className="min-h-3/4 flex w-full flex-col md:flex-row">
        <aside className="md:self-auto self-center mb-2 md:mb-0 flex-none md:h-3/4 p-4 mt-1 border border-black md:w-1/5 mx-5 md:ml-0 md:flex h-full w-3/5">
          <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
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
              <Price
                control={control}
                minPrice={errors.minPrice}
                maxPrice={errors.maxPrice}
              />
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
          </Form>
        </aside>
        <div className="flex-1 min-w-0 overflow-auto">
          {queryVendor.length == 0 && queryService.length == 0 ? (
            <div>Not found!!!!!</div>
          ) : (
            ""
          )}
          {queryVendor.length > 0 ? (
            <div className="flex-1 w-full flex flex-col items-center">
              <h1 className="text-2xl text-oliveGreen font-bold mb-1 md:text-3xl text-center">
                Vendor:
              </h1>
              <div className="max-w-7xl mx-6 w-[80%]">
                {queryVendor.map((vendor) => {
                  return <VendorCard key={vendor.id} vendor={vendor} />;
                })}
              </div>
            </div>
          ) : (
            ""
          )}

          {queryService.length > 0 ? (
            <div className="flex-1 w-full flex flex-col items-center">
              <h1 className="text-2xl text-oliveGreen font-bold mb-1 md:text-3xl text-center">
                Service:
              </h1>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl md:mr-6 md:ml-0 mx-6">
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
