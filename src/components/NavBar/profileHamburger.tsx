import Image from "next/image";
import Link from "next/link";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface IHamburgerMenuChildProps {
  children: JSX.Element | JSX.Element[] | string;
  href?: string;
}
const HamburgerMenuChild: React.FC<IHamburgerMenuChildProps> = (
  props: IHamburgerMenuChildProps
) => {
  return (
    <Link
      href={props.href ?? "/#"}
      className={`hover:bg-limeGreen hover:bg-opacity-20 
      first:rounded-t-xl last:rounded-b-xl
    py-2 px-2`}
    >
      {props.children}
    </Link>
  );
};

interface IHamburgerMenuProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
const NavBarHamburgerMenu: React.FC<IHamburgerMenuProps> = (
  props: IHamburgerMenuProps
) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      props.setShow(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div
      className={`absolute ${props.show ? "flex" : "hidden"} flex-col top-12 
        rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]
        w-40 gap-3 
        left-1/2 transform -translate-x-1/2
        bg-white
    `}
    >
      <HamburgerMenuChild href="/login">Login</HamburgerMenuChild>
      <HamburgerMenuChild>Hello</HamburgerMenuChild>
      <HamburgerMenuChild>Hello</HamburgerMenuChild>
      <HamburgerMenuChild>Hello</HamburgerMenuChild>
    </div>
  );
};

export default function ProfileHamBurger() {
  const size = 32;
  const [show, setShow] = useState(false);
  const toggleHamburgerMenu = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <div
      onClick={() => {
        toggleHamburgerMenu();
      }}
      className="transition relative
     flex flex-row items-center border-2 border-solid 
    border-gray-300 rounded-3xl px-2 py-1 gap-3
    shadow-sm bg-white
    hover:shadow hover:border-oliveGreen"
    >
      <Image
        priority
        src="/assets/hamburger.svg"
        height={size - 8}
        width={size - 8}
        alt="Profile Hamburger"
      />
      <Image
        priority
        src="/assets/profile.svg"
        height={size}
        width={size}
        alt="Profile Hamburger"
      />
      <NavBarHamburgerMenu show={show} setShow={setShow} />
    </div>
  );
}
