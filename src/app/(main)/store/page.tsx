"use client";
import ServiceList from "components/HomePageServiceContainer/homepageServiceContainer";
import Store from "components/Store";
import {StoreData} from "@/data/store";

const Page = () => {
    return (
        <div>
            <div className="flex flex-col justify-center">
                <Store store={StoreData[0]}/>
                <div className="flex items-center flex-col max-w-7xl mx-auto">
                    <h1 className="w-full text-3xl text-oliveGreen font-bold ">
                        Services
                    </h1>
                    <ServiceList/>
                </div>
            </div>
        </div>
    );
};

export default Page;
