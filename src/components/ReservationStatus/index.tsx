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
  ratingTime: string;
}

const statusOrder = ["Pending", "Accepted", "Start", "End", "Rating"];

const ReservationStatus = ({
  status,
  pendingTime,
  acceptedTime,
  startTime,
  endTime,
  ratingTime,
}: IReservationStatus) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status === selectedStatus ? "" : status);
  };

  const statusIndex = statusOrder.indexOf(status);

  return (
    <div className="flex flex-col md:mt-10 mt-2 border-b-4 border-dashed pb-3 border-gray-400">
      <h1 className="text-midGreen font-bold text-3xl self-center">
        RESERVATION STATUS
      </h1>
      <div className="flex flex-row md:mt-12 mt-5 w-full">
        {statusOrder.map((s, i) => (
          <React.Fragment key={s}>
            {i !== 0 && (
              <div
                className={` w-1/4 md:w-1/12 h-1 mx-auto my-4 border-0  rounded md:my-10 bg-${
                  i <= statusIndex ? "midGreen" : "gray-400"
                } invisible md:visible `}
              ></div>
            )}
            <div className="flex flex-col justify-center items-center">
              <div
                className={` mb-3 w-[2.5rem] h-[2.5rem] md:w-[4rem] md:h-[4rem] border-${
                  i <= statusIndex ? "midGreen" : "gray-400"
                } border-4  rounded-full text-red flex justify-center items-center ${
                  s === selectedStatus ? "bg-gray-100" : ""
                }`}
                onClick={() => handleStatusClick(s)}
              >
                <IconContext.Provider value={{ size: "auto" }}>
                  {s === "Pending" && (
                    <AiOutlineFieldTime
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                  {s === "Accepted" && (
                    <AiOutlineLike
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                  {s === "Start" && (
                    <MdStart color={i <= statusIndex ? "#59981A" : "#DFDFDF"} />
                  )}
                  {s === "End" && (
                    <TiTickOutline
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                  {s === "Rating" && (
                    <AiOutlineStar
                      color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                    />
                  )}
                </IconContext.Provider>
              </div>
              <div
                className={
                  selectedStatus === s ? "font-semibold text-center text-xs md:text-sm" : ""
                }
              >
                <div
                  className={
                    selectedStatus === s
                      ? ""
                      : "hidden md:block font-semibold text-center text-xs md:text-sm"
                  }
                >
                  {s === "Pending" && (
                    <div className="">Placed reservation</div>
                  )}
                  {s === "Accepted" && <div>Accepted</div>}
                  {s === "Start" && <div>Start</div>}
                  {s === "End" && <div>End</div>}
                  {s === "Rating" && <div>Rating</div>}
                </div>
                <div
                  className={
                    selectedStatus === s
                      ? "text-gray-400 whitespace-nowrap"
                      : "hidden md:block text-gray-400 text-xs md:text-sm whitespace-nowrap text-center"
                  }
                >
                  {s === "Pending" && <div>{pendingTime}</div>}
                  {!pendingTime && s === "Pending" && <div>&nbsp;</div>}
                  {s === "Accepted" && <div>{acceptedTime}</div>}
                  {!acceptedTime && s === "Accepted" && <div>&nbsp;</div>}
                  {s === "Start" && <div>{startTime}</div>}
                  {!startTime && s === "Start" && <div>&nbsp;</div>}
                  {s === "End" && <div>{endTime}</div>}
                  {!endTime && s === "End" && <div>&nbsp;</div>}
                  {s === "Rating" && <div>{ratingTime}</div>}
                  {!ratingTime && s === "Rating" && <div>&nbsp;</div>}
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
