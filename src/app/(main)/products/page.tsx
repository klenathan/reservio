"use client";
import CategoryList from "@/components/CategoryServiceContainer/CategoryList";
import {Suspense, useEffect, useRef, useState} from "react";
import Price from "components/CategoryServiceContainer/Price";
import Card from "@/components/Card";
import {Product, Vendor} from "../../../../Types";
import VendorCard from "@/components/Vendor/VendorCard";
import Form from "@/components/Form";
import {SubmitHandler, useForm} from "react-hook-form";
import useFetch from "@/Helper/ClientFetch/useFetch";
import LoadingSpinner from "components/LoadingSpinner";
import Sort from "components/SearchableDropdown/Sort";
import DatePicker from "components/Detail/Pricing/FlexiblePricing/DatePicker";
import {getUnixTime} from "date-fns";

interface IFromInput {
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    fromDate?: number | string;
    toDate?: number | string;
}


export default function Category(slugs: any) {
    // const [value, setValue] = useState<string>("");
    const [url, setUrl] = useState<string>()
    const [queryService, setServices] = useState<Product[]>([]);
    const [queryVendor, setVendors] = useState<Vendor[]>([]);
    const [sortBy, setSortBy] = useState<any>()
    const [aside, setAside] = useState<boolean>(false)

    const [date, setDate] = useState<any>({
        startDate: "",
        endDate: ""
    })

    const {data, error, isLoading} = useFetch<any>(url as string)


    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue, getValues
    } = useForm<IFromInput>();


    useEffect(() => {
        if (slugs.searchParams.category) {
            setUrl(`service?category=${slugs.searchParams.category}`)
        } else if (slugs.searchParams.keyword) {
            setUrl(`search?query=${slugs.searchParams.keyword}`)
        } else {
            setUrl('service')
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

    const sortOptions = [
        {value: "sortPrice", label: "Sort price"},
        {value: "sortName", label: "Sort name"},
        {value: "sortCreatedAt", label: "Sort time"}
    ];

    const handleSort = (childData: any) => {
        setSortBy({
            sortBy: childData.sortBy,
            order: childData.order
        })
        if (slugs.searchParams.category) {
            setUrl(`/service?category=${slugs.searchParams.category || ""}&minPrice=${getValues("minPrice") || ""}&maxPrice=${getValues('maxPrice') || ""}&fromDate=${getValues('fromDate') || ""}&toDate=${getValues('toDate') || ""}&${childData.sortBy}=${childData.order}`)
        } else if (slugs.searchParams.keyword) {
            setUrl(`search?query=${slugs.searchParams.keyword}&${childData.sortBy}=${childData.order}`)
        }
    }

    const isFirstOpenRef: any = useRef(true);

    const handleDate = (date: any) => {
        // Only update state if DatePicker has been focused before
        if (!isFirstOpenRef.current) {
            setDate({
                startDate: date.startDate,
                endDate: date.endDate
            })

            if (date.startDate) {
                setValue('fromDate', getUnixTime(date.startDate))
            }

            if (date.endDate) {
                setValue('toDate', getUnixTime(date.endDate))
            } else {
                setValue('toDate', "")
            }
        } else {
            isFirstOpenRef.current = false;
        }
    }

    const toggleOpenAside = () => {
        setAside(!aside);
    };

    const onSubmit: SubmitHandler<IFromInput> = async (data) => {
        let minPrice = data.minPrice ? data.minPrice : "";
        let maxPrice = data.maxPrice ? data.maxPrice : "";

        let fromDate = data.fromDate ? data.fromDate : "";
        let toDate = data.toDate ? data.toDate : "";

        setUrl(`/service?category=${slugs.searchParams.category || ""}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}&${sortBy.sortBy}=${sortBy.order}`)
    };

    const onCancel = () => {
        setValue('fromDate', "")
        setValue('toDate', "")
        setValue('minPrice', "")
        setValue('maxPrice', "")
    }


    return (
        <div className="overflow-hidden ">
            <CategoryList categoryActive={slugs.searchParams.category}/>
            <div className={'flex w-full justify-center'}>
                <div className="flex w-full flex-col md:flex-row 2k:w-[calc(100vw_-_20rem)] h-full ">
                    {aside &&
                        <aside
                            ref={isFirstOpenRef}
                            className="md:self-auto h-fit self-center mb-2 md:mb-0 p-4 mt-1 border border-black md:w-1/5 mx-5 md:ml-0 md:flex"
                        >
                            <Form onSubmit={handleSubmit(onSubmit)} button="Submit" onCancel={onCancel}>
                                <div className="my-3">
                                    <h1 className="text-xl text-oliveGreen font-bold mb-2">
                                        By Date:
                                    </h1>
                                    <DatePicker parentCallBack={handleDate} userEndDate={date.endDate}/>
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
                            </Form>

                        </aside>
                    }
                    {isLoading && <LoadingSpinner text={"Loading product"}/>}
                    {data &&
                        <div className="flex-1 min-w-0 overflow-auto">
                            {queryVendor.length == 0 && queryService.length == 0 ? (
                                <div className={'flex justify-center text-3xl font-bold m-auto font-mono'}>
                                    📢 Warning!!!!! 📢
                                </div>
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
                                    <div className="flex-1 w-full flex flex-col items-center space-y-5">
                                        <h1 className="text-2xl text-oliveGreen font-bold mb-1 md:text-3xl text-center">
                                            Service:
                                        </h1>
                                        <div className={'md:mr-6 md:ml-0 mx-6 space-y-4'}>
                                            <Sort sortOptions={sortOptions} parentCallBack={handleSort}
                                                  toggleFilter={toggleOpenAside}/>
                                            <div
                                                className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 place-items-center max-w-7xl">
                                                {queryService.map((service) => {
                                                    return (
                                                        <Suspense key={service.id} fallback={
                                                            <LoadingSpinner/>
                                                        }>
                                                            <Card key={service.id} service={service}/>
                                                        </Suspense>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                ) :
                                (
                                    ""
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </div>

    );
}
