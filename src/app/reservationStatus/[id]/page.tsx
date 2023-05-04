"use client";
import { NotFound } from "next/dist/client/components/error";
import LoadingSpinner from "components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import { Reservation } from "../../../../Types";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import ReservationStatus from "@/components/ReservationStatus";
import ReservationInfo from "@/components/ReservationInfo";
import ReservationTime from "@/components/ReservationTime";

// interface ReservationStatusParams {
//   params: {
//     id: string;
//   };
// }

export default function ReservStatus() {
  // const {data, isError, isLoading} = useFetch<Reservation>(`reservation/${slugs.params.id}`)
  // const items = [
  //     {label: "Home", href: "/"},
  //     {label: data?., href: `/category?id=${data?.category}`},
  //     {label: data?.name, href: "/"},
  // ];

//   if (isLoading) {
//     return (
//       <div className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
//         <LoadingSpinner text="Loading product data, please wait..." />
//       </div>
//     );
//   }

//   if (isError && !data) {
//     return <NotFound />;
//   }

//   if (data) {
    return (
      // md:px-8 lg:px-56
      <div>
        <Head>
          <title>Reservation status</title>
        </Head>
        <NavBar />
        <div className="md:mx-24 mx-5">
            
          <ReservationStatus status={"End"} pendingTime={"1"} acceptedTime={"2"} startTime={"3"} endTime={"4"} ratingTime={"5"}/>
           
          <div className="mt-5">
            <ReservationInfo
              status={""}
              productName={"DA LAT HOUSE"}
              price={5000000}
              totalPrice={4000000}
              category={"Hotel"}
              quantity={5}
            />
          </div>
        </div>
      </div>
    );
  }
// }
