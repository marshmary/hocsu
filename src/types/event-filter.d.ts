interface AdminPageFilter {
    page: number;
    limit: number;
    title?: string;
    from?: string;
    to?: string;
}

interface AdminFilterResult {
    totalPages: number;
    events: HistoryEvent[];
}
