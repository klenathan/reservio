import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center bg-oliveGreen h-full py-4">
        <h1 className="text-3xl text-white font-bold">Reservio</h1>
      </div>

      <div className="flex justify-center items-center bg-limeGreen h-full py-4">
        <h1 className="text-3xl text-white font-bold">Reservio</h1>
      </div>

      <div className="flex justify-center items-center bg-yellowGreen h-full py-4">
        <h1 className="text-3xl text-black font-bold">Reservio</h1>
      </div>

      <div className="flex justify-center items-center bg-midGreen h-full py-4">
        <h1 className="text-3xl text-white font-bold">Reservio</h1>
      </div>
    </div>
  );
}
