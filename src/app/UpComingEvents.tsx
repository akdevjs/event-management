// libs
import React, { useState } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import { HeartIcon } from "@heroicons/react/24/outline";

// utils
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import { likedEventsAtom } from "./store";
import { db } from "../../firebase";

// components
import Loader from "./Loader";

interface Props {
  events: EventType[];
  isLoading: boolean;
}

function UpComingEvents({ events, isLoading }: Props) {
  const [loading, setLoading] = useState(false);
  const [likedEvents, setLikedEvents] = useAtom(likedEventsAtom);

  return (
    <section className="py-8 px-6 bg-white rounded-3xl flex flex-col gap-6">
      <h2 className="text-2xl">Upcoming Events</h2>
      {isLoading ? (
        <div className="max-h-[42vh] overflow-y-auto md:flex md:flex-col grid grid-cols-2 gap-3">
          {Array.from({ length: 5 }).map((_, index: number) => (
            <div className="border rounded-2xl py-3 px-4 flex justify-between items-center  animate-pulse  md:flex md:items-center">
              <div className="flex flex-col items-start justify-center gap-1">
                <div className="h-6 bg-gray-200 rounded-full md:w-64 w-32"></div>
                <div className="h-5 bg-gray-200 rounded-full md:w-40 w-20 "></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-h-[42vh] overflow-y-auto md:flex md:flex-col grid grid-cols-2 gap-3">
          {events?.map((event: EventType, index: number) => (
            <Event
              key={event?.id + "##" + index + "##" + event?.id}
              event={event}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default UpComingEvents;

function Event({ event }: { event: EventType }) {
  // states
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
    <div className="border rounded-2xl py-3 px-4 flex justify-between md:items-center items-start">
      <div className="flex flex-col items-start gap-1">
        <h3 className="text-[10px] sm:text-sm md:text-base md:max-w-[80%] font-bold text-gray-600">
          {event.title}
        </h3>
        <p className="text-[8px] sm:text-xs md:text-sm text-gray-500">
          {formatDate(event.start) + ", " + formatTime(event.start)}
        </p>
      </div>
      {loading ? (
        <div className="w-[10%] pr-3 md:pr-5 pl-2 md:pl-4 py-5">
          <Loader size="sm" />
        </div>
      ) : (
        <div
          className="w-[10%] pr-3 md:pr-5 pl-2 md:pl-4 py-5"
          onClick={() => {
            addLike(event?.id);
          }}
        >
          {likedEvents?.includes(event?.id) ? (
            <SolidHeartIcon className="md:w-5 md:min-w-5 min-w-3 w-3 text-red-400" />
          ) : (
            <HeartIcon className="md:w-5 md:min-w-5 min-w-3 w-3 text-blue-800" />
          )}
        </div>
      )}
    </div>
  );
}
