import {AiFillCar, AiOutlinePlusCircle} from "react-icons/ai";
import {GiMoneyStack} from "react-icons/gi";
import {IoFastFoodOutline, IoStorefrontOutline} from "react-icons/io5";
import {MdCastForEducation, MdHomeRepairService, MdOutlineBalance, MdOutlineHealthAndSafety,} from "react-icons/md";
import {BsHospital} from "react-icons/bs";

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
    icon: <MdHomeRepairService />,
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
    icon: <BsHospital />,
  },
  {
    id: "Others",
    category: "Others",
    icon: <AiOutlinePlusCircle />,
  },
];
