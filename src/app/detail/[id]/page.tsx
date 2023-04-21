"use client";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import Breadcrumb from "components/Breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import { IService } from "components/HomePageServiceContainer/serviceInterface";
import Loading from "@/app/detail/loading";
import DetailPage from "components/Detail";
import { NotFound } from "next/dist/client/components/error";

interface DetailParams {
  params: {
    id: string;
  };
}

export default function Detail(slugs: DetailParams) {
  const [data, setData] = useState<IService>();
  // const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false);

  const items = [
    { label: "Home", href: "/" },
    { label: data?.category, href: "/" },
    { label: data?.name, href: "/" },
  ];

  // TODO: Optimize the page loading and not found
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}service/${slugs.params.id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log("Service" + e);
        setData(e);
        setIsError(true);
      });
  }, [slugs.params.id]);

  if (!data && !isError) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
      <Head>
        <title>Reservio</title>
      </Head>
      <NavBar />
      <Breadcrumb items={items} />
      {data ? <DetailPage service={data} /> : <Loading />}
    </div>
  );
}
