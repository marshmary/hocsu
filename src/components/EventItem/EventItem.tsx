interface EventItemProps {
    item: HistoryEvent;
}

const EventItem: React.FC<EventItemProps> = ({ item }) => {
    return (
        <div className="p-4 flex flex-col w-full">
            {/* Header */}
            <div className="py-1">
                <h3 className="font-bold text-2xl">{item.title}</h3>
                <div className="text-lg">{item.place}</div>
            </div>

            {/* Time */}
            <div className="text-xs text-[color:var(--color-brown)]">
                {item.time}
            </div>

            {/* Content */}
            <div className="py-2">{item.content}</div>
        </div>
    );
};

export default EventItem;
