import { Carousel } from "flowbite-react";
import React, { FunctionComponent } from "react";
import "./Home.RightContent.css";

interface RightContentProps {
    className?: string;
    style?: React.CSSProperties | undefined;
}

const RightContent: FunctionComponent<RightContentProps> = ({
    className = "",
    style = {},
}) => {
    const imgs = [
        "https://picsum.photos/id/234/1920/1080",
        "https://picsum.photos/id/135/1920/1080",
        "https://picsum.photos/id/233/1920/1080",
        "https://picsum.photos/id/666/1920/1080",
        "https://picsum.photos/id/520/1920/1080",
    ];

    return (
        <div className={`h-full w-full grayscale ${className}`} style={style}>
            <Carousel slideInterval={8000}>
                {imgs.map((img, index) => (
                    <div
                        className="h-full w-full"
                        key={index}
                        style={{
                            backgroundImage: `url(${img})`,
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
