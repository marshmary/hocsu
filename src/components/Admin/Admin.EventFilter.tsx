import { Button, TextInput } from "flowbite-react";
import { FunctionComponent, useState } from "react";

interface EventFilterProps {
  filter: AdminPageFilter;
  setFilter: React.Dispatch<React.SetStateAction<AdminPageFilter>>;
}

const initFilter = {
  title: "",
  from: "",
  to: "",
};

const EventFilter: FunctionComponent<EventFilterProps> = ({
  filter,
  setFilter,
}) => {
  const [localFilter, setLocalFilter] = useState(initFilter);
  const handleReset = () => {
    setLocalFilter({ ...initFilter });
    setFilter({ ...filter, ...initFilter });
  };

  const handleApply = () => {
    if (
      localFilter.title === initFilter.title &&
      localFilter.from == initFilter.from &&
      localFilter.to == initFilter.to
    )
      return;
    setFilter({ ...filter, ...localFilter });
  };

  return (
    <div className="w-full h-auto flex gap-10 flex-wrap">
      <div>
        <div className="mb-2 font-medium">Title:</div>
        <TextInput
          id="event"
          type="text"
          placeholder="Enter an event name"
          required={true}
          value={localFilter.title}
          onChange={(e) => {
            setLocalFilter({
              ...localFilter,
              title: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <div className="mb-2 font-medium">From:</div>
        <TextInput
          type="date"
          required={true}
          value={localFilter.from}
          onChange={(e) => {
            setLocalFilter({
              ...localFilter,
              from: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <div className="mb-2 font-medium">To:</div>
        <TextInput
          type="date"
          required={true}
          value={localFilter.to}
          onChange={(e) => {
            setLocalFilter({ ...localFilter, to: e.target.value });
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
