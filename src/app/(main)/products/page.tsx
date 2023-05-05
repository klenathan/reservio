"use client";
import CategoryList from "@/components/CategoryServiceContainer/CategoryList";
import {useEffect, useState} from "react";
import {cities} from "@/data/city";
import Price from "components/CategoryServiceContainer/Price";
import Calendar from "components/CategoryServiceContainer/Calendar";
import Card from "@/components/Card";
import {City, Product, Vendor} from "../../../../Types";
import SearchableDropdown from "@/components/SearchableDropdown";
import VendorCard from "@/components/Vendor/VendorCard";
import Form from "@/components/Form";
import {SubmitHandler, useForm} from "react-hook-form";
import useFetch from "@/Helper/ClientFetch/useFetch";
import LoadingSpinner from "components/LoadingSpinner";

interface IFromInput {
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    fromDate?: string;
    toDate?: string;
}

export default function Category(slugs: any) {
    const [value, setValue] = useState<string>("");
    const [url, setUrl] = useState<string>('service')
    const [queryService, setServices] = useState<Product[]>([]);
    const [queryVendor, setVendors] = useState<Vendor[]>([]);
    const {data, error, isLoading} = useFetch<any>(url)

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IFromInput>();

    useEffect(() => {
        if (slugs.searchParams.category) {
            setUrl(`service/category/${slugs.searchParams.category}`)
        }

        if (slugs.searchParams.keyword) {
            setUrl(`search?query=${slugs.searchParams.keyword}`)
        }
    }, [slugs.searchParams.category, slugs.searchParams.keyword])


    useEffect(() => {
        if (data) {
            if (data.products || data.vendors) {
                setServices(data.products)
                setVendors(data.vendors)
            } else {
                setServices(data)
            }
        }
    }, [data]);

    if (error) {
        console.log(error)
    }

    const onSubmit: SubmitHandler<IFromInput> = async (data) => {
        let minPrice = data.minPrice ? data.minPrice : "";
        let maxPrice = data.maxPrice ? data.maxPrice : "";
        let category = slugs.searchParams.category
            ? slugs.searchParams.category
            : "";
        let fromDate = data.fromDate ? data.fromDate : "";
        let toDate = data.toDate ? data.toDate : "";
        setUrl(`/service?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&fromDate=${fromDate}&toDate=${toDate}`)
    };
    
    return (
        <div className="overflow-hidden">
            <CategoryList/>

            <div className="min-h-3/4 flex w-full flex-col md:flex-row">
                <aside
                    className="md:self-auto self-center mb-2 md:mb-0 flex-none md:h-3/4 p-4 mt-1 border border-black md:w-1/5 mx-5 md:ml-0 md:flex h-full w-3/5">
                    <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
                        <div className="my-3">
                            <h1 className="text-xl text-oliveGreen font-bold mb-2">
                                By Date:
                            </h1>
                            <Calendar/>
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
                {isLoading && <LoadingSpinner text={"Loading product"}/>}
                {data &&
                    <div className="flex-1 min-w-0 overflow-auto">
                        {queryVendor.length == 0 && queryService.length == 0 ? (
                            <div className={'flex justify-center text-3xl font-bold m-auto font-mono '}>⛔⛔⛔⛔ Not
                                found!!!!! ⛔⛔⛔⛔⛔</div>
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
                                        return <VendorCard key={vendor.id} vendor={vendor}/>;
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
                                <div
                                    className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl md:mr-6 md:ml-0 mx-6">
                                    {queryService.map((service) => {
                                        return <Card key={service.id} service={service}/>;
                                    })}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
