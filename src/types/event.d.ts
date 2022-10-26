interface HistoryEvent {
    id: string;
    title: string;
    place: string;
    time: string;
    content: string;
    timeline: TimeLine;
    images: Image[];
}

type TimeLine = string;

interface DbTimeline {
    id: string;
    title: string;
}

interface TimelineCreate {
    title: string;
}

interface HistoryEventCreateForm {
    title: string;
    place?: string;
    from: string;
    to: string;
    content: string;
    // timeline: TimeLine;
    images: File[];
}

interface HistoryEventEditForm {
    id: string;
    title: string;
    place?: string;
    from: string;
    to: string;
    content: string;
    images: Image[];
    imageFiles: Files[];
}

interface HistoryEventCreate {
    title: string;
    place?: string;
    from: TimeStamp;
    time: string;
    content: string;
    timeline: TimeLine;
    images: Image[];
}

interface Image {
    url: string;
    key: string;
}
