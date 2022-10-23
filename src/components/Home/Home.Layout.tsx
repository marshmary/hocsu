import React, { useEffect, useRef, useState } from "react";
import { listEventsByTimeline } from "~/data/events";
import { listTimelines } from "~/data/timelines";
import { useOutsideClick } from "~/utils/use-outside-click";
import { useHorizontalSwipe } from "~/utils/use-swipe";

import Timeline from "../Timeline/Timeline";
import HomeLeftContent from "./Home.LeftContent";
import HomeRightContent from "./Home.RightContent";

const HomeLayout = () => {
    const { isTimelineShowing, swipeProps, timelineRef } = useHomeRenderLogic();

    const [timelineData, setTimelineData] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [events, setEvents] = useState<HistoryEvent[]>([]);

    useEffect(() => {
        listTimelines().then((res) => {
            setTimelineData(res);
            setSelectedTime(res[0]);
        });
    }, []);

    useEffect(() => {
        if (selectedTime) {
            listEventsByTimeline(selectedTime).then((res) => setEvents(res));
        }
    }, [selectedTime]);

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
                <HomeLeftContent
                    className="order-2 lg:order-1"
                    events={events}
                />
                <HomeRightContent
                    className="order-1 lg:order-2"
                    events={events}
                />
            </div>
        </>
    );
};

export default HomeLayout;

function useHomeRenderLogic() {
    // To determine the timeline is showing or not
    const [isTimelineShowing, setTimelineShowing] = useState<boolean>(false);

    const timelineRef = useRef(null);

    // Handle swipe
    const swipeProps = useHorizontalSwipe({
        minSwipeDistance: 150,
        handleRightSwipe: () => setTimelineShowing(true),
        handleLeftSwipe: () => setTimelineShowing(false),
    });

    // Handle outside click
    useOutsideClick(timelineRef, () => setTimelineShowing(false));

    return {
        isTimelineShowing,
        swipeProps,
        timelineRef,
    };
}
