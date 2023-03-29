"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import CategoryList from "@/components/Category";
import CateService from "@/components/Service/cateService";
import SearchableDropdown from "@/components/City";
import { useState } from "react";
import { ICity } from "@/components/City/cityInterface";
import { cities } from "@/data/city";
import Price from "@/components/Price";
import Calendar from "@/components/Calendar";

export default function Home() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="overflow-hidden">
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />

      <CategoryList image="/assets/profile.svg" />

      <div className="flex">
        <aside className="w-72 fixed left-0 h-3/4 p-4 mt-1 border border-black">
          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              Filter by Date:
            </h1>
            <Calendar />
          </div>

          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              Filter by Price:
            </h1>
            <Price />
          </div>

          <div className="my-3">
            <h1 className="text-xl text-oliveGreen font-bold mb-2">
              Filter by City:
            </h1>
            <SearchableDropdown
              options={cities as ICity}
              label="name"
              id="id"
              selectedVal={value}
              handleChange={(val: string) => setValue(val)}
            />
          </div>
        </aside>

        <div className="flex-1 ml-72">
          <CateService />
        </div>
      </div>
    </div>
  );
}
