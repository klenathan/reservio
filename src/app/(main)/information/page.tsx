"use client";
import AboutUs from "@/components/AboutUs";
import Image from "next/image";

export default function Information() {
  return (
    <div>
      <div className=" mb-4 md:mb-0 block relative w-full h-[20rem]">
        <Image
          src="/assets/background_authenticate.svg"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="Profile Hamburger"
          className="px-0 object-cover"
        />
      </div>
      <AboutUs/>
    </div>
  );
}
