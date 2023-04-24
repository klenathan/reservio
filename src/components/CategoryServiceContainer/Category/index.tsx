import { ReactElement } from "react";
import { IconType } from "react-icons";
import { FaHotel } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import {
  MdOutlineHealthAndSafety,
  MdCastForEducation,
  MdOutlineBalance,
} from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GrHostMaintenance } from "react-icons/gr";
import { IoFastFoodOutline, IoStorefrontOutline } from "react-icons/io5";
import Link from "next/link";

const CategoryList = () => {
  const categories = [
    {
      id: "Healthcare",
      name: "Healthcare",
      icon: <MdOutlineHealthAndSafety />,
    },
    {
      id: "Transportation",
      name: "Transportation",
      icon: <AiFillCar />,
    },
    {
      id: "Legal",
      name: "Legal",
      icon: <MdOutlineBalance />,
    },
    {
      id: "Financial",
      name: "Financial",
      icon: <GiMoneyStack />,
    },
    {
      id: "Education",
      name: "Education",
      icon: <MdCastForEducation />,
    },
    {
      id: "Maintenance_N_repair",
      name: "Maintenance and Repair",
      icon: <GrHostMaintenance />,
    },
    {
      id: "F_N_B",
      name: "F&B",
      icon: <IoFastFoodOutline />,
    },
    {
      id: "Retail",
      name: "Retail",
      icon: <IoStorefrontOutline />,
    },
    {
      id: "Hospitality",
      name: "Hospitality",
      icon: <FaHotel />,
    },
  ];
  return (
    <div className="place-items-center grid grid-cols-3 w-full md:w-full md:grid-cols-5 md:m-0 md:border-none mt-24 m-auto">
      {categories.map((category) => {
        return (
          <Category
            key={category.id}
            id={category.id}
            cateName={category.name}
            icon={category.icon}
          />
        );
      })}
    </div>
  );
};
interface CategoryProps {
  id: string;
  cateName?: string;
  icon?: ReactElement<IconType>;
}

const Category = (props: CategoryProps) => {
  return (
    <Link href={`/category/${encodeURIComponent(props.id)}`}>
      <div className="text-center m-3">
        <div className="flex justify-center">{props.icon}</div>
        <div>{props.cateName}</div>
      </div>
    </Link>
  );
};

export default CategoryList;
