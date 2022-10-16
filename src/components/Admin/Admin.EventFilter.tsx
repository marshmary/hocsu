import { Button, TextInput } from "flowbite-react";
import { FunctionComponent, useState } from "react";

interface EventFilterProps {}

const initFilter = {
    name: "",
    from: "",
    to: "",
};

const EventFilter: FunctionComponent<EventFilterProps> = () => {
    const [filter, setFilter] = useState(initFilter);

    const handleReset = () => {
        setFilter(initFilter);
    };

    const handleApply = () => {
        if (
            filter.name === initFilter.name &&
            filter.from == initFilter.from &&
            filter.to == initFilter.to
        )
            return;
        console.log(
            "🚀 ~ file: Admin.EventFilter.tsx ~ line 14 ~ filter",
            filter
        );
    };

    return (
        <div className="w-full h-auto flex gap-10 flex-wrap">
            <div>
                <div className="mb-2 font-medium">Name:</div>
                <TextInput
                    id="event"
                    type="text"
                    placeholder="Enter an event name"
                    required={true}
                    value={filter.name}
                    onChange={(e) => {
                        setFilter({ ...filter, name: e.target.value });
                    }}
                />
            </div>
            <div>
                <div className="mb-2 font-medium">From:</div>
                <TextInput
                    type="date"
                    required={true}
                    value={filter.from}
                    onChange={(e) => {
                        setFilter({ ...filter, from: e.target.value });
                    }}
                />
            </div>
            <div>
                <div className="mb-2 font-medium">To:</div>
                <TextInput
                    type="date"
                    required={true}
                    value={filter.to}
                    onChange={(e) => {
                        setFilter({ ...filter, to: e.target.value });
                    }}
                />
            </div>

            <div className="flex items-end justify-end gap-3 w-full sm:w-auto">
                <Button onClick={handleApply}>Apply</Button>
                <Button color="light" onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default EventFilter;
