"use client";
// libs
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import axios from "axios";

// components
import Sidebar from "./Sidebar";
import Events from "./Events";
import EventStats from "./EventStats";
import UpComingEvents from "./UpComingEvents";
import EventOfMonth from "./EventOfMonth";
import HeaderMenu from "./HeaderMenu";

// utils
import getAddressFromCoordinates from "@/utils/getAddress";
import { isMenuOpenAtom, likedEventsAtom } from "./store";
import { useUpdateLikedEvents } from "./store";

function Dashboard() {
  // states
  const [selected, setSelected] = useState<"all" | "fav">("all");
  const [events, setEvents] = useState<EventType[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalEventsInMonth, setTotalEventsInMonth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likedEvents] = useAtom(likedEventsAtom);
  const [isMenuOpen] = useAtom(isMenuOpenAtom);
  const updateLikedEvents = useUpdateLikedEvents();

  // function to fetch all the data from predictHQ API and also add addresses to them using its coordinates
  const fetchEvents = async (
    startDate: string | null,
    endDate: string | null
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://api.predicthq.com/v1/events/", {
        headers: {
          Authorization: "Bearer 8SLImFe3yh6Sx329DHXKzYQgApJy3XtzRnfTu7Vz",
          Accept: "application/json",
        },
        params: {
          country: "Pakistan",
          "start.lte": endDate,
          "start.gte": startDate,
          sort: "start",
        },
      });

      // Update events with addresses
      const eventsWithAddresses = await Promise.all(
        response.data.results.map(async (event: any) => {
          const longitude = event.location[0];
          const latitude = event.location[1];
          const address = await getAddressFromCoordinates(latitude, longitude);
          return { ...event, address };
        })
      );

      setEvents(eventsWithAddresses);
      setTotalEvents(response.data.count);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const eventsInMonth = eventsWithAddresses.filter((event: any) => {
        const eventDate = new Date(event.start);
        return eventDate.getMonth() + 1 === currentMonth;
      });
      setTotalEventsInMonth(eventsInMonth.length);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsLoading(false);
    }
  };

  // initiating the fetching and using costom hook to update the global state for liked events using firebase
  useEffect(() => {
    fetchEvents(null, null);
    updateLikedEvents();
  }, []);

  return (
    <>
      {isMenuOpen && (
        <HeaderMenu selected={selected} setSelected={setSelected} />
      )}

      <div className="min-h-[90vh] flex flex-col md:flex-row md:mx-0 mx-5">
        {/* Sidebar */}
        <div className="md:py-8 md:px-6">
          <Sidebar selected={selected} setSelected={setSelected} />
        </div>
        {selected == "all" ? (
          <>
            <div className="container py-8 flex flex-col gap-5 w-full md:w-[70%]">
              <div className="md:hidden block">
                <UpComingEvents isLoading={isLoading} events={events} />
              </div>
              <Events
                fetch={fetchEvents}
                events={events}
                isLoading={isLoading}
                scope={selected}
              />
              <EventStats
                totalEvents={totalEvents}
                totalEventsInMonth={totalEventsInMonth}
                isLoading={isLoading}
              />
            </div>
            <div className="container py-8 flex flex-col gap-5 w-full md:w-[30%] max-h-[50vh]  md:mx-7">
              <div className="md:block hidden ">
                <UpComingEvents isLoading={isLoading} events={events} />
              </div>
              <EventOfMonth isLoading={isLoading} event={events[0]} />
            </div>
          </>
        ) : (
          <div className="w-full pr-6 py-8">
            <Events
              fetch={fetchEvents}
              events={events.filter((event) => likedEvents?.includes(event.id))}
              isLoading={isLoading}
              scope={selected}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
