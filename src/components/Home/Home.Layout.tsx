import React, { useRef, useState } from "react";
import { useOutsideClick } from "~/utils/use-outside-click";
import { useHorizontalSwipe } from "~/utils/use-swipe";

import Timeline from "../Timeline/Timeline";
import HomeLeftContent from "./Home.LeftContent";
import HomeRightContent from "./Home.RightContent";

const HomeLayout = () => {
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

    return (
        <>
            <div
                className="h-screen w-screen grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2"
                {...swipeProps}
            >
                <Timeline
                    isTimelineShowing={isTimelineShowing}
                    timelineRef={timelineRef}
                />
                <HomeLeftContent className="order-2 lg:order-1" />
                <HomeRightContent className="order-1 lg:order-2" />
            </div>
        </>
    );
};

export default HomeLayout;
