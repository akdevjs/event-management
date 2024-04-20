import React from "react";

interface Props {
  isLoading: boolean;
  totalEvents: number;
  totalEventsInMonth: number;
}

function EventStats({ isLoading, totalEvents, totalEventsInMonth }: Props) {
  return (
    <div>
      <div className="flex gap-2 md:gap-9">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index + "##" + index}
                className="flex flex-col items-start bg-white rounded-lg gap-2 w-full shadow-sm p-6 min-h-[130px]"
              >
                <div
                  key={index}
                  className="animate-pulse md:flex md:items-center"
                >
                  <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full w-8 md:w-12 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded-md w-16 md:w-24 mb-2.5"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex flex-col items-start bg-white rounded-lg gap-2 w-full shadow-sm p-6 min-h-[130px]">
              <h3 className="text-xs md:text-sm text-gray-600">All Events</h3>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {totalEvents}
              </h1>
            </div>
            <div className="flex flex-col items-start bg-white rounded-lg gap-2 w-full shadow-sm p-6 min-h-[130px]">
              <h3 className="text-xs md:text-sm text-gray-600">
                This Month Events
              </h3>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {totalEventsInMonth}
              </h1>
            </div>
            <div className="flex flex-col items-start bg-white rounded-lg gap-2 i w-full shadow-sm p-6 min-h-[130px]">
              <h3 className="text-xs md:text-sm text-gray-600">
                Favorite Events
              </h3>
              <h1 className="text-2xl md:text-3xl font-extrabold">{23}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventStats;
