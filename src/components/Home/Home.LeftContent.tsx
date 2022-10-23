import React, { FunctionComponent } from "react";
import EventItem from "../EventItem/EventItem";

import "./Home.LeftContent.css";
import HomeVerticalLine from "./Home.VerticalLine";

interface LeftContentProps {
    className?: string;
    style?: React.CSSProperties | undefined;
    events: HistoryEvent[];
}

const LeftContent: FunctionComponent<LeftContentProps> = ({
    className = "",
    style = {},
    events,
}) => {
    return (
        <div
            className={`${className} px-8 relative lg:px-32 xl:px-40 py-6 lg:py-32 left`}
            style={style}
        >
            <HomeVerticalLine />
            <div className="w-full h-full flex flex-col items-center overflow-y-scroll left-content">
                {events.map((item) => (
                    <EventItem item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default LeftContent;
