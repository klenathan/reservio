import Image from "next/image";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { MdStart } from "react-icons/md";
import React, { useState } from "react";
import { IconContext } from "react-icons";

interface IReservationStatus {
  status: string;
  pendingTime: string;
  acceptedTime: string;
  startTime: string;
  endTime: string;
}

const statusOrder = ["PENDING", "ACCEPTED", "START", "END", "RATED"];

const ReservationStatus = ({
  status,
  pendingTime,
  acceptedTime,
  startTime,
  endTime,
}: IReservationStatus) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  // const handleStatusClick = (status: string) => {
  //   setSelectedStatus(status === selectedStatus ? "" : status);
  // };

  const statusIndex = statusOrder.indexOf(status);

  return (  
    <div className="flex flex-col md:mt-10 mt-2 border-b-4 border-dashed pb-3 border-gray-400">
      <h1 className="text-midGreen font-bold text-3xl self-center whitespace-nowrap">
        RESERVATION STATUS
      </h1>
      <div className="flex flex-row md:mt-12 mt-5 w-full">
        {statusOrder.map((s, i) => (
          <React.Fragment key={s}>
            {i !== 0 && (
              <div
                className={` w-1/4 md:w-1/12 h-1 mx-auto my-4 border-0 rounded md:my-10  ${
                  i <= statusIndex ? "bg-midGreen" : "bg-gray-400"
                }  `}
              ></div>
            )}
            <div className="flex flex-col justify-center items-center">
              <div
                className={` mb-1 md:mb-3 w-[2.5rem] h-[2.5rem] md:w-[4rem] md:h-[4rem] px-1 py-1 border-${
                  i <= statusIndex ? "midGreen" : "gray-400"
                } border-4  rounded-full text-red flex justify-center items-center ${
                  s === selectedStatus ? "bg-gray-100" : ""
                }`}
              >
                <IconContext.Provider value={{ size: "auto" }}>
                  {s === "PENDING" && (
                    <AiOutlineFieldTime
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                  {s === "ACCEPTED" && (
                    <AiOutlineLike
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                  {s === "START" && (
                    <MdStart color={i <= statusIndex ? "#59981A" : "#DFDFDF"} />
                  )}
                  {s === "END" && (
                    <TiTickOutline
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                  {s === "RATED" && (
                    <AiOutlineStar
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                </IconContext.Provider>
              </div>
              <div className="font-semibold text-center text-xxs md:text-sm">
                <div className="font-semibold text-center line-clamp-2">
                  {s === "PENDING" && (
                    <div className="">Pending</div>
                  )}
                  {s === "ACCEPTED" && <div>Accepted</div>}
                  {s === "START" && <div>Start</div>}
                  {s === "END" && <div>End</div>}
                  {s === "RATED" && <div>Rating</div>}
                </div>
                <div className="text-gray-400 whitespace-nowrap text-center">
                  {s === "PENDING" && <div>{pendingTime}</div>}
                  {!pendingTime && s === "PENDING" && <div>&nbsp;</div>}
                  {s === "ACCEPTED" && <div>{acceptedTime}</div>}
                  {!acceptedTime && s === "ACCEPTED" && <div>&nbsp;</div>}
                  {s === "START" && <div>{startTime}</div>}
                  {!startTime && s === "START" && <div>&nbsp;</div>}
                  {s === "END" && <div>{endTime}</div>}
                  {!endTime && s === "END" && <div>&nbsp;</div>}
                  {s === "RATED" && <div>&nbsp;</div>}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ReservationStatus;
