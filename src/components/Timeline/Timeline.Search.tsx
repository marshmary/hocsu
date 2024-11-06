import React, { useRef } from "react";
import { toast } from "react-toastify";

import Icon from "~/components/Icon";

import "./Timeline.Search.style.css";

interface TimeLineSearchProps {
  timelineData: string[];
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  isTimelineShowing: boolean;
  searchFabRef: React.MutableRefObject<null>;
}

const TimeLineSearch: React.FC<TimeLineSearchProps> = ({
  timelineData,
  setSelectedTime,
  isTimelineShowing,
  searchFabRef,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchTimeline = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Null ref
    if (!searchInputRef || !searchInputRef.current) return;

    // Empty input
    if (
      !searchInputRef.current.value ||
      /^ *$/.test(searchInputRef.current.value)
    )
      return;

    if (timelineData.includes(searchInputRef.current.value)) {
      setSelectedTime(searchInputRef.current.value);
    } else {
      toast.warning(
        `Cannot find any event(s) in ${searchInputRef.current.value}`
      );
    }
  };

  return (
    <form
      className={`search-box shadow-lg ${isTimelineShowing ? "show" : ""}`}
      onSubmit={handleSearchTimeline}
      ref={searchFabRef}
    >
      <input
        type="text"
        className="search-input ring-transparent"
        placeholder="Year..."
        ref={searchInputRef}
      />
      <button
        className="search-btn"
        type="submit"
        disabled={timelineData.length === 0}
      >
        <Icon icon="search" />
      </button>
    </form>
  );
};

export default TimeLineSearch;
