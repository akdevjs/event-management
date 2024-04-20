import React from "react";
import { Squares2X2Icon, HeartIcon } from "@heroicons/react/24/outline";

interface Props {
  selected: "all" | "fav";
  setSelected: React.Dispatch<React.SetStateAction<"all" | "fav">>;
}

function Sidebar({ selected, setSelected }: Props) {
  return (
    <section className="px-4 py-7 rounded-[50px] bg-white h-full flex-col gap-5 hidden md:flex">
      <button
        className={`outline-none border-none rounded-full p-3 ${
          selected === "all"
            ? "bg-purple-50 text-purple-500"
            : "bg-gray-100 text-gray-500"
        }`}
        onClick={() => setSelected("all")}
      >
        <Squares2X2Icon className="w-6 h-6" />
      </button>
      <button
        className={`outline-none border-none rounded-full p-3 ${
          selected === "fav"
            ? "bg-purple-50 text-purple-500"
            : "bg-gray-100 text-gray-500"
        }`}
        onClick={() => setSelected("fav")}
      >
        <HeartIcon className="w-6 h-6" />
      </button>
    </section>
  );
}

export default Sidebar;
