import { Carousel } from "flowbite-react";
import React, { FunctionComponent } from "react";
import { DEFAULT_IMGS } from "~/utils/constants";
import "./Home.RightContent.css";

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
                    ></div>
                ))}
            </Carousel>
        </div>
    );
};

export default RightContent;
