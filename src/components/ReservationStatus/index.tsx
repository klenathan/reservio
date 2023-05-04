import Image from "next/image";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { MdStart } from "react-icons/md";
import React from "react";

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
  const statusIndex = statusOrder.indexOf(status);
  return (
    <div className="flex flex-col mt-10  border-b-4 border-dashed pb-3 border-gray-400">
      <h1 className="text-midGreen font-bold text-3xl self-center">
        RESERVATION STATUS
      </h1>
      <div className="flex flex-row mt-16   ">
        {statusOrder.map((s, i) => (
          <React.Fragment key={s}>
            {i !== 0 && (
              <div
                className={`w-72 h-1 mx-auto my-4 bg-${
                  i <= statusIndex ? "midGreen" : "gray-400"
                } border-0 rounded md:my-10 `}
              ></div>
            )}
            <div className="flex flex-col justify-center items-center">
              <div
                className={`relative w-[4rem] h-[4rem] border-r-4 border-${
                  i <= statusIndex ? "midGreen" : "gray-400"
                } border-4  rounded-full text-red flex justify-center items-center`}
              >
                {s === "Pending" && (
                  <AiOutlineFieldTime
                    size={40}
                    color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                  />
                )}
                {s === "Accepted" && (
                  <AiOutlineLike
                    size={40}
                    color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                  />
                )}
                {s === "Start" && (
                  <MdStart
                    size={40}
                    color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                  />
                )}
                {s === "End" && (
                  <TiTickOutline
                    size={40}
                    color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                  />
                )}
                {s === "Rating" && (
                  <AiOutlineStar
                    size={40}
                    color={i <= statusIndex ? "#59981A" : "#DFDFDF"}
                  />
                )}
              </div>
              <div>
                {s === "Pending" && (<div>{pendingTime}</div>)}
                {s === "Accepted" && (<div>{acceptedTime}</div>)}
                {s === "Start" && (<div>{startTime}</div>)}
                {s === "End" && (<div>{endTime}</div>)}
                {s === "Rating" && (<div>{ratingTime}</div>)}
                
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ReservationStatus;
