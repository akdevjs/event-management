// libs
import React, { useState } from "react";
import { HeartIcon, Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useAtom } from "jotai";

// utils
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import { likedEventsAtom } from "./store";
import { db } from "../../firebase";

// components
import Loader from "./Loader";
import FilterPopup from "./FilterPopup";
import EventModal from "./EventModal";

interface EventsProps {
  events: EventType[];
  isLoading: boolean;
  fetch: (startDate: string | null, endDate: string | null) => void;
  scope: "all" | "fav";
}

const Events = ({ events, isLoading, fetch, scope }: EventsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between w-full">
        <h2 className="text-xl font-bold">Event List</h2>
        <button className="relative border bg-white shadow-md py-3 px-2">
          <Bars3BottomRightIcon
            onClick={() => setIsOpen(!isOpen)}
            className="w-5 h-5 text-purple-800"
          />
          <FilterPopup fetch={fetch} isOpen={isOpen} setIsOpen={setIsOpen} />
        </button>
      </div>
      <div className="overflow-x-auto ">
        <div className="min-w-[600px]">
          <div className="border border-x-0 border-t-0 border-b-gray-400  text-[#303030] text-base font-bold flex items-center mb-6">
            <div className="text-xs sm:text-sm md:text-base w-[10%] px-4 py-3">
              #
            </div>
            <div className="text-xs sm:text-sm md:text-base w-[30%] px-4 py-3">
              Name
            </div>
            <div className="text-xs sm:text-sm md:text-base w-[10%] px-4 py-3">
              Time
            </div>
            <div className="text-xs sm:text-sm md:text-base w-[30%] px-4 py-3">
              Location
            </div>
            <div className="text-xs sm:text-sm md:text-base w-[10%] px-4 py-3">
              Date
            </div>
            <div className="text-xs sm:text-sm md:text-base w-[10%] px-4 py-3"></div>
          </div>
          {!isLoading ? (
            <div
              className={`${
                scope == "fav" ? "md:h-[72vh]" : "md:h-[50vh]"
              } h-[85vh] overflow-y-auto`}
            >
              {events.map((event: EventType, index: number) => (
                <TableRow
                  key={index}
                  sno={index + 1}
                  name={event?.title}
                  time={formatTime(event?.start)}
                  location={event?.address}
                  date={formatDate(event?.start)}
                  desc={event?.description}
                  cat={event?.category}
                  id={event?.id}
                />
              ))}
            </div>
          ) : (
            <div className="h-[50vh] bg-white rounded-lg flex justify-center items-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;

// component for the each row of table
function TableRow({
  sno,
  name,
  time,
  location,
  date,
  desc,
  cat,
  id,
}: {
  sno: number;
  name: string;
  time: string;
  location: string | undefined;
  date: string;
  desc: string;
  cat: string;
  id: string;
}) {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likedEvents, setLikedEvents] = useAtom(likedEventsAtom);

  // function to add the liked event id in firestore db

  const addLike = async (id: string) => {
    setLoading(true);
    const likedEventRef = doc(db, "liked-events", id);
    if (likedEvents.includes(id)) {
      // Event already liked, remove it
      await deleteDoc(likedEventRef);
      setLikedEvents(likedEvents.filter((eventId) => eventId !== id));
    } else {
      // Event not liked, add it
      await addDoc(collection(db, "liked-events"), { event_id: id });
      setLikedEvents([...likedEvents, id]);
    }
    setLoading(false);
  };
  return (
    <>
      {isOpen && (
        <EventModal
          name={name}
          time={time}
          date={date}
          description={desc}
          category={cat}
          location={location}
          onClose={setIsOpen}
        />
      )}

      <div className="text-gray-500 bg-white rounded-lg flex justify-between items-center w-full mb-3 md:mb-6 shadow-sm  cursor-pointer text-xs sm:text-sm md:text-base">
        <div className="w-[10%] pr-2 md:pr-4 pl-3 md:pl-5 py-2 text-[#04103B] font-extrabold ">
          {sno}
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className="w-[30%] px-2 md:px-4 py-3 md:py-5 hover:text-purple-950"
        >
          {name}
        </div>
        <div className="w-[10%] px-2 md:px-4 py-3 md:py-5 font-bold">
          {time}
        </div>
        <div className="w-[30%] px-2 md:px-4 py-3 md:py-5 font-bold">
          {location}
        </div>
        <div className="w-[10%] px-2 md:px-4 py-3 md:py-5">{date}</div>
        {loading ? (
          <div className="w-[10%] pr-3 md:pr-5 pl-2 md:pl-4 py-5">
            <Loader size="sm" />
          </div>
        ) : (
          <div
            className="w-[10%] pr-3 md:pr-5 pl-2 md:pl-4 py-5"
            onClick={() => {
              addLike(id);
              setLikedEvents([...likedEvents, id]);
            }}
          >
            {likedEvents?.includes(id) ? (
              <SolidHeartIcon className="w-6 h-6 text-red-400" />
            ) : (
              <HeartIcon className="w-6 h-6 text-purple-950" />
            )}
          </div>
        )}
      </div>
    </>
  );
}
