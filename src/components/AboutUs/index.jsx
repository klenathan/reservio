/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="container mx-auto md:px-4 md:py-8 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 ml-7 text-center text-midGreen">
        About Us
      </h1>

      <div className="flex flex-col items-center justify-center py-7 ">
        <div className="md:w-4/5 text-center w-full">
          <p className="text-2xl md:text-3xl font-bold mb-5">
            Reservio is a leading platform for booking and making reservations
            in Southeast Asia and Vietnam.
          </p>
          <p className="text-md md:text-lg text-gray-500">
            Our platform is designed to provide users with a simple, convenient,
            and secure experience when it comes to booking various services
            online. Whether you're looking to make a restaurant reservation,
            schedule a spa appointment, or book a fitness class, Reservio is
            here to help. Our platform operates 24/7, ensuring that you can make
            reservations at any time that suits your needs. We believe in making
            the online booking experience easy, enjoyable, and hassle-free for
            our users, empowering them to discover and access a wide range of
            services with confidence.
          </p>
        </div>
        <div className="mt-7">
          <Link href={"/"}>
            <Button btnStyle="filled">Discover about Reservio </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:w-4/5 justify-between mt-16 text-gray-500">
          <div className="shadow-xl w-full md:w-1/2 mr-5 border-2 border-gray-200 rounded-xl text-center px-5 py-5 mb-5 md:mb-0">
            <span className="font-semibold text-xl md:text-2xl text-black">
              Our target{" "}
            </span>
            <p className="mt-5">
              At Reservio, we firmly believe in harnessing the transformative
              power of technology to make a positive impact on the world. Our
              goal is to connect individuals and businesses within the community
              by providing a comprehensive e-commerce platform that facilitates
              seamless booking and reservation experiences.
            </p>
          </div>
          <div className="shadow-xl w-full md:w-1/2 mr-5 border-2 border-gray-200 rounded-xl text-center px-5 py-5 ">
            <span className="font-semibold text-xl md:text-2xl text-black">
              Our positioning{" "}
            </span>
            <p className="mt-5">
              At Reservio, we are dedicated to providing users across the region
              with a comprehensive and integrated online booking experience. Our
              platform offers a diverse range of services, catering to the
              unique needs and preferences of our users. We take pride in
              fostering a dynamic user community, where individuals can
              discover, explore, and connect with various service providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
