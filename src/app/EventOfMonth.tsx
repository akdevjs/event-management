// libs
import React from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";

// utils
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";

interface Props {
  event: EventType;
  isLoading: boolean;
}

function EventOfMonth({ event, isLoading }: Props) {
  return (
    <div className="p-4 rounded-2xl bg-purple-700 text-white flex flex-col gap-1 shadow-2xl shadow-purple-700">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">
          Event of <br /> the month
        </h1>
        <Image src="/imgs/eventOftheMont.svg" alt="" width={70} height={70} />
      </div>
      {isLoading ? (
        <div className="bg-white border rounded-2xl py-3 px-4 flex justify-between items-center">
          <div className="animate-pulse  md:flex md:items-center">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-64"></div>
              <div className="h-5 bg-gray-200 rounded-full w-32 "></div>
              <div className="h-5 bg-gray-200 rounded-full w-40 "></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-2xl py-3 px-4 flex justify-between items-center bg-white">
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-base max-w-[100%] font-bold text-purple-600">
              {event?.title}
            </h3>
            <p className="text-sm text-gray-500">
              Category : <b>{event?.category}</b>
            </p>
            <div className="flex justify-center items-center gap-1">
              <MapPinIcon className="w-4 text-blue-800" />
              <p className="text-sm text-gray-500">{event?.address}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Image src="/imgs/user.svg" alt="" width={75} height={30} />
            <p className="text-sm text-gray-300">
              {formatDate(event?.start)}
              <br />
              {formatTime(event?.start)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventOfMonth;
{
  /* <p className="text-sm text-gray-500">
            {formatDate(event?.start) + ", " + formatTime(event?.start)}
          </p> */
}
