// libs
import React, { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";

// utils
import { isMenuOpenAtom } from "./store";

function Header() {
  const [search, setSearch] = useState<string>("");
  const [_, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  return (
    <header className="flex items-center gap-2 justify-between md:justify-start md:gap-[60px] h-20 px-6 md:px-10">
      <div className="relative w-[49px] h-[49px]">
        <Image src="imgs/logo.svg" alt="Vercel Logo" fill />
      </div>
      <div className="max-w-[500px] w-full  h-10 flex items-center gap-3 rounded-[50px] bg-gray-100 px-4">
        <MagnifyingGlassIcon className="w-6 h-6 text-[#3D4756]" />
        <input
          type="text"
          placeholder="Search Events"
          className="w-full outline-none border-none placeholder:text-[#3D4756] bg-transparent text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        className="flex md:hidden "
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <Bars3BottomRightIcon className="w-7 h-7 text-purple-800" />
      </button>
    </header>
  );
}

export default Header;
