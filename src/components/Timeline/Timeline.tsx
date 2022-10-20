import { useState } from "react";
import TimelineItem from "./Timeline.Item";

const Timeline = () => {
    const data = ["XVI - XIX", "2016 - 2018", 2019, 2020, 2021, 2022];

    const [active, setActive] = useState<string | number>(2020);

    return (
        <div className="hidden lg:block h-screen absolute left-0 top-0 pl-4 screen">
            <ol className="relative border-l border-gray-300 h-full py-10">
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
