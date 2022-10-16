import React from "react";

import { motion } from "framer-motion";

interface TimelineItemProps {
    time: number | string;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<string | number>>;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
    time,
    isActive,
    setIsActive,
}) => {
    return (
        <li
            className="mb-10 ml-4 cursor-pointer flex flex-row items-center"
            onClick={() => setIsActive(time)}
        >
            <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white"></div>

            <motion.div
                whileHover={{
                    scale: 1.15,
                }}
                className={
                    isActive
                        ? "text-sm text-gray-900 pt-[8.5px] pl-1"
                        : "text-sm text-gray-500 pt-[8.5px] pl-1"
                }
            >
                {time}
            </motion.div>
        </li>
    );
};

export default TimelineItem;
