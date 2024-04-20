import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

interface EventModalProps {
  name: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string | undefined;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventModal = ({
  name,
  description,
  category,
  date,
  time,
  location,
  onClose,
}: EventModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={() => onClose(false)}
      ></div>
      <article className="z-50 bg-white rounded-3xl py-8  max-w-[800px] w-full">
        <div className="pb-4 px-6 border-t-0 border-l-0 border-r-0 border flex flex-col gap-6">
          <div className="flex justify-between items-start  mb-4">
            <h2 className="text-3xl max-w-[400px] font-bold">{name}</h2>
            <p className="text-gray-400 font-bold text-base">
              {" "}
              {date + " " + time}
            </p>
          </div>
          <div className="text-lg">
            <span className="text-gray-400">Category : </span>
            <b className="text-gray-400">{category}</b>
          </div>
          <h3 className="text-light text-xl">Description</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="pt-6 flex justify-center items-center gap-4">
          <MapPinIcon className="w-6 text-blue-800" />
          <p className="text-xl text-gray-500">{location}</p>
        </div>
      </article>
    </div>
  );
};

export default EventModal;
