'use client'; 
import Logo from "@/components/NavBar/logo";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <div className="relative w-[33%] h-[33%]">
        {" "}
        <Image className="object-contain" fill alt="NOT FOUND" src="/404.png" />
      </div>
      <Logo logoStyle={"green"} />
      <Link
        className="text-2xl hover:underline hover:text-midGreen"
        href="/"
      >
        Go to homepage
      </Link>
    </div>
  );
}
