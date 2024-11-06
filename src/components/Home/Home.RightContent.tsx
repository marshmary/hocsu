import { Carousel } from "flowbite-react";
import React, { FunctionComponent } from "react";
import { DEFAULT_IMGS } from "~/utils/constants";
import "./Home.RightContent.css";
import Icon from "../Icon";

interface RightContentProps {
    className?: string;
    style?: React.CSSProperties | undefined;
    events: HistoryEvent[];
}

const RightContent: FunctionComponent<RightContentProps> = ({
    className = "",
    style = {},
    events,
}) => {
    const getImgs = () => {
        let imgs: Image[] = events.map((item) => item.images).flat();

        if (imgs.length == 0) {
            imgs = DEFAULT_IMGS;
        }

        return imgs;
    };

    return (
        <div className={`h-full w-full ${className}`} style={style}>
            <Carousel slideInterval={8000}>
                {getImgs().map((img, index) => (
                    <div
                        className="h-full w-full"
                        key={index}
                        style={{
                            backgroundImage: `url(${img.url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {img.source && (
                        <a
                            className="flex h-8 w-28 md:w-44 absolute left-3 bottom-3 rounded-lg items-center px-2 bg-white/50 dark:bg-gray-800/60"
                            href={img.source}
                            target="_blank"
                        >
                            <span
                                className="overflow-hidden text-left text-nowrap"
                            >
                                {img.source}
                            </span>
                        </a>
                        )}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default RightContent;
