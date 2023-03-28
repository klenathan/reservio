import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      id="logo-wrapper"
      className="flex flex-col cursor-pointer text-center"
    >
      <p className="font-logo font-semibold text-5xl italic text-midGreen">
        Reservio
      </p>
      <p className="text-base italic text-gray-500">Reserve it? Reservio</p>
    </Link>
  );
}
