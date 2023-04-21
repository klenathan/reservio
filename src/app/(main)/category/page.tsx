"use client";
import CategoryList from "components/CategoryServiceContainer/Category";
import CateService from "components/HomePageServiceContainer/cateService";
import SearchableDropdown from "components/CategoryServiceContainer/City";
import {useState} from "react";
import {ICity} from "components/CategoryServiceContainer/City/cityInterface";
import {cities} from "@/data/city";
import Price from "components/CategoryServiceContainer/Price";
import Calendar from "components/CategoryServiceContainer/Calendar";

export default function Category() {
    const [value, setValue] = useState<string>("");

    return (
        <div className="overflow-hidden">
            <CategoryList/>

            <div className="flex">
                <aside className="w-72 fixed left-0 h-3/4 p-4 mt-1 border border-black">
                    <div className="my-3">
                        <h1 className="text-xl text-oliveGreen font-bold mb-2">
                            Filter by Date:
                        </h1>
                        <Calendar/>
                    </div>

                    <div className="my-3">
                        <h1 className="text-xl text-oliveGreen font-bold mb-2">
                            Filter by Price:
                        </h1>
                        <Price/>
                    </div>

                    <div className="my-3">
                        <h1 className="text-xl text-oliveGreen font-bold mb-2">
                            Filter by City:
                        </h1>
                        <SearchableDropdown
                            options={cities as ICity}
                            label="name"
                            selectedVal={value}
                            handleChange={(val: string) => setValue(val)}
                        />
                    </div>
                </aside>

                <div className="flex-1 ml-72">
                    <CateService/>
                </div>
            </div>
        </div>
    );
}
