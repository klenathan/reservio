import { AiFillCar, AiOutlinePlusCircle } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GrHostMaintenance } from "react-icons/gr";
import { IoFastFoodOutline, IoStorefrontOutline } from "react-icons/io5";
import {
  MdCastForEducation,
  MdOutlineBalance,
  MdOutlineHealthAndSafety,
} from "react-icons/md";

export const categories = [
  {
    id: "Healthcare",
    category: "Healthcare",
    icon: <MdOutlineHealthAndSafety />,
  },
  {
    id: "Transportation",
    category: "Transportation",
    icon: <AiFillCar />,
  },
  {
    id: "Legal",
    category: "Legal",
    icon: <MdOutlineBalance />,
  },
  {
    id: "Financial",
    category: "Financial",
    icon: <GiMoneyStack />,
  },
  {
    id: "Education",
    category: "Education",
    icon: <MdCastForEducation />,
  },
  {
    id: "Maintenance_N_repair",
    category: "Maintenance and Repair",
    icon: <GrHostMaintenance />,
  },
  {
    id: "F_N_B",
    category: "F&B",
    icon: <IoFastFoodOutline />,
  },
  {
    id: "Retail",
    category: "Retail",
    icon: <IoStorefrontOutline />,
  },
  {
    id: "Hospitality",
    category: "Hospitality",
    icon: <FaHotel />,
  },
  {
    id: "Others",
    category: "Others",
    icon: <AiOutlinePlusCircle />,
  },
];
