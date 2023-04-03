import Link from "next/link";

interface ILogoStyle {
  logoStyle: "green" | "white";
}

const Logo: React.FC<ILogoStyle> = (props: ILogoStyle) => {
  return (
    <Link
      href={"/"}
      className="sm:text-left md:text-center flex flex-col cursor-pointer max-w-screen-xl"
    >
      <p
        className={`font-logo font-semibold text-5xl italic ${
          props.logoStyle == "green" ? "text-midGreen" : "text-white"
        } `}
      >
        Reservio
      </p>
      <p className="text-base italic text-white-500">Reserve it? Reservio</p>
    </Link>
  );
};

export default Logo;
