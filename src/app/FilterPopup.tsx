// libs
import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";

// utils
import { startDateAtom, endDateAtom, categoryAtom } from "./store";
import { getTodayDate } from "@/utils/getTodaysDate";

interface FilterPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetch: (startDate: string | null, endDate: string | null) => void;
}

const FilterPopup = ({ isOpen, setIsOpen, fetch }: FilterPopupProps) => {
  // states
  const [startDate, setStartDate] = useAtom<string>(startDateAtom);
  const [endDate, setEndDate] = useAtom<string>(endDateAtom);
  const [category, setCategory] = useAtom<string>(categoryAtom);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const dummyCategories = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Data Science",
  ];

  // to add functionality of if user clicks on any thing other then this modal it should be closed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // it is to check whether the filter is correct or not and then again call the fetch
  useEffect(() => {
    if (
      getTodayDate() + "T12:00" !== endDate &&
      getTodayDate() + "T12:00" !== startDate
    ) {
      fetch(startDate.split("T")[0], endDate.split("T")[0]);
      console.log((startDate.split("T")[0], endDate.split("T")[0]));
    } else {
      fetch(null, null);
      console.log((startDate.split("T")[0], endDate.split("T")[0]));
    }
  }, [startDate, endDate, category]);

  if (!isOpen) return null;

  return (
    <div
      ref={wrapperRef}
      className="absolute -right-3 top-20 mx-auto p-5  shadow-lg z-10 rounded-md bg-white"
    >
      <div className="bg-white absolute -top-5 right-3 w-10 h-10 rounded-md  rotate-45 -z-1"></div>
      <div className="mt-2">
        <p className="text-base text-left text-gray-500 mb-3">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block max-w-[210px] w-full px-1 py-3 text-sm  text-gray-500 placeholder:text-gray-500 bg-gray-100  rounded transition ease-in-out m-0 focus:outline-none"
        >
          {dummyCategories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="text-base text-left  text-gray-500 mb-3">Date & Time</p>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-300">From</p>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block max-w-[210px] w-full px-1 py-3 text-sm text-gray-500 placeholder:text-gray-500 bg-gray-100 rounded transition ease-in-out m-0 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-300">To</p>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block max-w-[210px] w-full px-1 py-3 text-sm text-gray-500 placeholder:text-gray-500 bg-gray-100 rounded transition ease-in-out m-0 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
