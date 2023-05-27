import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { IconContext } from "react-icons";
import { ImGooglePlus } from "react-icons/im";
import Link from "next/link";

// [#002e24]
const Footer = () => {
  return (
    <div className="bg-midGreen mt-20">
      <div className="container mx-auto md:px-24 md:py-7">
        <div className="flex flex-col lg:flex-row flex-wrap items-center md:justify-evenly border-b-2 py-4">
          <div className="w-full md:w-1/3">
            <Link
              href={"/"}
              className=" cursor-pointer max-w-screen-xl text-center md:text-left "
            >
              <p className="font-logo font-semibold text-5xl italic text-white mb-2 md:mb-0 ">
                Reservio
              </p>
            </Link>
          </div>
          <div className="w-full md:w-full lg:w-1/3 text-center whitespace-nowrap">
            <ul className="text-gray-200 font-bold md:flex text-base justify-center items-center">
              <li className="mr-2">
                <a href="#" className="block">
                  <span
                    className="block cursor-not-allowed"
                    title="Not yet available, sorry for the inconvenience!"
                  >
                    Contact
                  </span>
                </a>
              </li>
              <li className="mr-2">
                <a href="/information/" className="block">
                  About us
                </a>
              </li>
              <li className="mr-2">
                <span
                  className="block cursor-not-allowed"
                  title="Not yet available, sorry for the inconvenience!"
                >
                  Blog
                </span>
              </li>
              <li className="">
                <span
                  className="block cursor-not-allowed"
                  title="Not yet available, sorry for the inconvenience!"
                >
                  License
                </span>
              </li>
            </ul>
          </div>
          <div className=" md:w-full lg:w-1/3">
            <IconContext.Provider value={{ size: "2rem", color: "white" }}>
              <ul className="flex md:justify-center lg:justify-end">
                <li className="mr-3">
                  <a href="https://github.com/klenathan/reservio" target={"_blank"}>
                    <span
                      className="block"
                      title="Not yet available, sorry for the inconvenience!"
                    >
                      <AiOutlineInstagram> </AiOutlineInstagram>
                    </span>
                  </a>
                </li>
                <li className="mr-3 ">
                  <a href="https://github.com/klenathan/reservio" target={"_blank"}>
                    <span
                      className="block"
                      title="Not yet available, sorry for the inconvenience!"
                    >
                      <AiFillFacebook> </AiFillFacebook>
                    </span>
                  </a>
                </li>
                <li className="mr-3">
                  <a href="https://github.com/klenathan/reservio" target={"_blank"}>
                    <span
                      className="block"
                      title="Not yet available, sorry for the inconvenience!"
                    >
                      <AiOutlineTwitter> </AiOutlineTwitter>
                    </span>
                  </a>
                </li>
              </ul>
            </IconContext.Provider>
          </div>
        </div>
        <div className="text-center mt-5 text-white font-semibold mb-5 md:mb-0">
          <p>Copyright © 2023 Reservio All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
