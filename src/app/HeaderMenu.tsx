// libs
import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";

// utils
import { isMenuOpenAtom } from "./store";

interface Props {
  selected: "all" | "fav";
  setSelected: React.Dispatch<React.SetStateAction<"all" | "fav">>;
}

function HeaderMenu({ setSelected }: Props) {
  const [_, setIsMenuOpen] = useAtom(isMenuOpenAtom);

  // handle click and also update the toggle functionality between the favorite events and all events
  const handleClick = (page?: "all" | "fav" | undefined) => {
    if (page) {
      setSelected(page);
    }
    setIsMenuOpen(false);
  };
  return (
    <section
      className={`flex md:hidden flex-col gap-7 fixed inset-0 pt-28 px-6 bg-purple-700 text-white z-[9999]`}
    >
      <div
        className="absolute w-[35px] h-[35px]  top-5 left-8"
        onClick={() => handleClick("all")}
      >
        <Image src="imgs/logoMob.svg" alt="Vercel Logo" fill />
      </div>
      <button
        className="absolute top-5 right-8"
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <XMarkIcon className="w-[35px] h-[35px]" />
      </button>

      <button
        onClick={() => handleClick("all")}
        className="text-3xl pb-4 border-t-0 border-x-0 border-b-2 border-white font-bold"
      >
        DashBoard
      </button>
      <button
        onClick={() => handleClick("fav")}
        className="text-3xl pb-4 border-t-0 border-x-0 border-b-2 border-white font-bold"
      >
        Favorite Events{" "}
      </button>
    </section>
  );
}

export default HeaderMenu;
