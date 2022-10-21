import React, { FunctionComponent } from "react";
import EventItem from "../EventItem/EventItem";

import "./Home.LeftContent.css";
import HomeVerticalLine from "./Home.VerticalLine";

const data: HistoryEvent[] = [
    {
        id: "2",
        title: "Cách mạng Tháng Mười",
        place: "Nga",
        time: "25 tháng 10, 1917",
        content: `Cách mạng Tháng Mười Nga, chính thức được biết đến trong lịch sử Liên Xô với tên gọi Cách mạng xã hội chủ nghĩa tháng Mười vĩ đại và thường được gọi là Cuộc nổi dậy tháng Mười, Cách mạng Bolshevik, hoặc Tháng Mười Đỏ, là một sự kiện lịch sử đánh dấu sự ra đời của nhà nước Nga Xô viết.`,
        timeline: "2022",
    },
    {
        id: "1",
        title: "Trận Bạch Đằng",
        place: "Sông Bạch Đằng",
        time: "938",
        content: `Trận Bạch Đằng năm 938 là một trận đánh giữa quân dân Tĩnh Hải quân (vào thời đó, Việt Nam chưa có quốc hiệu chính thức)
         do Ngô Quyền lãnh đạo đánh với quân Nam Hán trên sông Bạch Đằng. 
         Kết quả là người Việt giành thắng lợi lớn nhờ kế sách cắm cọc nhọn dưới lòng sông Bạch Đằng của Ngô Quyền. 
         Trước sự chiến đấu dũng mãnh của người Việt, quá nửa quân Nam Hán chết đuối, Hoàng tử Nam Hán là Lưu Hoằng Tháo cũng tử trận. 
         Đây là một trận đánh quan trọng trong lịch sử Việt Nam. 
         Nó đánh dấu cho việc chấm dứt hơn 1000 năm Bắc thuộc của Việt Nam, nối lại quốc thống cho người Việt.`,
        timeline: "2022",
    },

    {
        id: "3",
        title: "Hoshimachi Suisei",
        place: "VSinger",
        time: "March 22, 2018 - Now",
        content: `彗星の如くあらわれたスターの原石！アイドルVtuberの星街すいせいです！すいちゃん ... 今日もかわいいーーー！`,
        timeline: "2022",
    },
    {
        id: "4",
        title: "Hoshimachi Suisei",
        place: "VSinger",
        time: "March 22, 2018 - Now",
        content: `彗星の如くあらわれたスターの原石！アイドルVtuberの星街すいせいです！すいちゃん ... 今日もかわいいーーー！`,
        timeline: "2022",
    },
];

interface LeftContentProps {
    className?: string;
    style?: React.CSSProperties | undefined;
}

const LeftContent: FunctionComponent<LeftContentProps> = ({
    className = "",
    style = {},
}) => {
    return (
        <div
            className={`${className} px-8 relative lg:px-32 xl:px-40 py-6 lg:py-32 left`}
            style={style}
        >
            <HomeVerticalLine />
            <div className="w-full h-full flex flex-col items-center overflow-y-scroll left-content">
                {data.map((item) => (
                    <EventItem item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default LeftContent;
