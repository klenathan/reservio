import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href={"/"}
            id="logo-wrapper"
            className="sm:text-left flex flex-col cursor-pointer  mx-auto max-w-screen-xl"
        >
            <p className="font-logo font-semibold text-5xl italic text-white ">
                Reservio
            </p>
            <p className="text-base italic text-white-500">Reserve it? Reservio</p>
        </Link>
    );
}
