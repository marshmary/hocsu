import { Select, SelectProps } from "flowbite-react";
import { forwardRef, useMemo } from "react";
import { useEventQuery } from "../events.query";

export const SelectEvent: React.FC<SelectProps> = forwardRef<HTMLSelectElement>(
  (props, ref) => {
    const { data } = useEventQuery();
    const SelectOptions = useMemo(() => {
      if (!data || !Array.isArray(data)) return [];

      return data.map((item) => (
        <option value={item.id} key={item.id}>
          {item.title}
        </option>
      ));
    }, [data]);

    return (
      <Select {...props} ref={ref} defaultValue="">
        <option value="" disabled hidden>
          Select event
        </option>
        {SelectOptions}
      </Select>
    );
  }
);
