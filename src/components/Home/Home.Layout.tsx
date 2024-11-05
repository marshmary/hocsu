import React, { useEffect, useRef, useState } from "react";
import { listEventsByTimeline } from "~/data/events";
import { listTimelines } from "~/data/timelines";
import { SWIPE_LENGTH } from "~/utils/constants";
import { useOutsideClick } from "~/utils/use-outside-click";
import { useHorizontalSwipe } from "~/utils/use-swipe";
import { useQuizzesByEventIdsQuery } from "~/modules/quiz-managment/queries";

import Timeline from "../Timeline/Timeline";
import TimeLineSearch from "../Timeline/Timeline.Search";
import HomeLeftContent from "./Home.LeftContent";
import HomeRightContent from "./Home.RightContent";

const HomeLayout = () => {
  // Control render logic
  const { isTimelineShowing, swipeProps, timelineRef, searchFabRef } =
    useHomeRenderLogic();
  // Control data logic
  const { events, timelineData, selectedTime, setSelectedTime, quizzes } =
    useHomeDataLogic();

  return (
    <>
      <div
        className="h-screen w-screen grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2"
        {...swipeProps}
      >
        <Timeline
          isTimelineShowing={isTimelineShowing}
          timelineRef={timelineRef}
          timelineData={timelineData}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <TimeLineSearch
          timelineData={timelineData}
          setSelectedTime={setSelectedTime}
          isTimelineShowing={isTimelineShowing}
          searchFabRef={searchFabRef}
        />
        <HomeLeftContent className="order-2 lg:order-1" events={events} />
        <HomeRightContent className="order-1 lg:order-2" events={events} />
      </div>
    </>
  );
};

export default HomeLayout;

function useHomeRenderLogic() {
  // To determine the timeline is showing or not
  const [isTimelineShowing, setTimelineShowing] = useState<boolean>(false);

  const timelineRef = useRef(null);
  const searchFabRef = useRef(null);

  // Handle swipe
  const swipeProps = useHorizontalSwipe({
    minSwipeDistance: SWIPE_LENGTH,
    handleRightSwipe: () => setTimelineShowing(true),
    handleLeftSwipe: () => setTimelineShowing(false),
  });

  // Handle outside click
  useOutsideClick([timelineRef, searchFabRef], () => setTimelineShowing(false));

  return {
    isTimelineShowing,
    swipeProps,
    timelineRef,
    searchFabRef,
  };
}

function useHomeDataLogic() {
  const [timelineData, setTimelineData] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [events, setEvents] = useState<HistoryEvent[]>([]);

  const { data: quizzes } = useQuizzesByEventIdsQuery(
    events.map((each) => each.id)
  );

  // First render => fetch timelines data
  useEffect(() => {
    listTimelines().then((res) => {
      setTimelineData(res);
      setSelectedTime(res[0]);
    });
  }, []);

  // When selected timeline => fetch events data
  useEffect(() => {
    if (selectedTime) {
      listEventsByTimeline(selectedTime).then((res) => setEvents(res));
    }
  }, [selectedTime]);

  return {
    events,
    timelineData,
    selectedTime,
    setSelectedTime,
    quizzes,
  };
}
