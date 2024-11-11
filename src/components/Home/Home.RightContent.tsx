import { Carousel } from "flowbite-react";
import React, { FunctionComponent } from "react";
import { DEFAULT_IMGS } from "~/utils/constants";
import { HomeQuiz } from "./Home.Quiz";
import "./Home.RightContent.css";
import Icon from "../Icon";
import PageLoadAnimation from "../Loading/PageLoadAnimation";

interface RightContentProps {
    className?: string;
    style?: React.CSSProperties | undefined;
    events: HistoryEvent[];
    isQuizShowing: boolean;
}

const RightContent: FunctionComponent<RightContentProps> = ({
    className = "",
    style = {},
    events,
    isQuizShowing,
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
            {isQuizShowing ? (
                <PageLoadAnimation key="quizzes" className="h-full w-full">
                    <HomeQuiz events={events} />
                </PageLoadAnimation>
            ) : (
                <PageLoadAnimation key="carousel" className="h-full w-full">
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
                </PageLoadAnimation>
            )}
        </div>
    );
};

export default RightContent;
