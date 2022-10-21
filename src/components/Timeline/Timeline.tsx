import { useState } from "react";
import TimelineItem from "./Timeline.Item";

import "./Timeline.style.css";

interface TimelineProps {
    isTimelineShowing: boolean;
    timelineRef: React.MutableRefObject<null>;
}

const Timeline: React.FC<TimelineProps> = ({
    isTimelineShowing,
    timelineRef,
}) => {
    const data = [
        "XVI - XIX",
        "2016 - 2018",
        2019,
        2020,
        2021,
        2022,
        2023,
        "XV - XVI",
        "2016 - 2019",
        2024,
        2025,
        2026,
        2027,
        2030,
    ];

    const [active, setActive] = useState<string | number>(2020);

    return (
        <div
            className={`lg:block h-screen fixed top-0 px-5 screen overflow-scroll bg-white z-10 shadow-2xl lg:shadow-none home-timeline ${
                isTimelineShowing ? "show" : ""
            }`}
            ref={timelineRef}
        >
            <ol className="relative border-l border-gray-300 py-10">
                {data.map((item) => (
                    <TimelineItem
                        time={item}
                        key={item}
                        isActive={item == active}
                        setIsActive={setActive}
                    />
                ))}
            </ol>
        </div>
    );
};

export default Timeline;
