import { useEffect } from "react";

export function useOutsideClick(ref: any, outsideCallback: () => void) {
    useEffect(() => {
        /**
         * Set listData to null
         */
        function handleClickOutside(event: any) {
            if (Array.isArray(ref)) {
                for (let item of ref) {
                    if (item.current && item.current.contains(event.target))
                        return;
                }

                outsideCallback();
            } else if (ref.current && !ref.current.contains(event.target)) {
                outsideCallback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
