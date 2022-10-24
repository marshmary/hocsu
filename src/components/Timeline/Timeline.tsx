import TimelineItem from "./Timeline.Item";

import "./Timeline.style.css";

interface TimelineProps {
    isTimelineShowing: boolean;
    timelineRef: React.MutableRefObject<null>;
    timelineData: string[];
    selectedTime: string | null;
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
}

const Timeline: React.FC<TimelineProps> = ({
    isTimelineShowing,
    timelineRef,
    timelineData,
    selectedTime,
    setSelectedTime,
}) => {
    return (
        <div
            className={`lg:block min-w-[6rem] h-screen fixed top-0 px-5 screen overflow-y-scroll bg-white z-10 shadow-2xl lg:shadow-none home-timeline ${
                isTimelineShowing ? "show" : ""
            }`}
            ref={timelineRef}
        >
            <ol className="relative border-l border-gray-300 py-10 min-h-full">
                {timelineData.map((item) => (
                    <TimelineItem
                        time={item}
                        key={item}
                        isActive={item == selectedTime}
                        setIsActive={setSelectedTime}
                    />
                ))}
            </ol>
        </div>
    );
};

export default Timeline;
