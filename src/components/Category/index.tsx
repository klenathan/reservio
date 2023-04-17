import { ReactElement } from "react";
import { IconType } from "react-icons";
import { FaHotel, FaHospital } from "react-icons/fa";
import { AiFillCar, AiFillPlusCircle } from "react-icons/ai";
import { MdSportsFootball, MdFlight } from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";

const CategoryList = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-7 place-items-center">
      <Category icon={<FaHotel />} cateName="Stay" />
      <Category icon={<AiFillCar />} cateName="Vehicles" />
      <Category icon={<MdFlight />} cateName="Flights" />
      <Category icon={<MdSportsFootball />} cateName="Sports" />
      <Category icon={<IoMdRestaurant />} cateName="Restaurants" />
      <Category icon={<FaHospital />} cateName="Hospitals" />
      <Category icon={<AiFillPlusCircle />} cateName="Others" />
    </div>
  );
};
interface CategoryProps {
  cateName?: string;
  icon?: ReactElement<IconType>;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="text-center m-3">
      <div className="flex justify-center">{props.icon}</div>
      <div>{props.cateName}</div>
    </div>
  );
};

export default CategoryList;
