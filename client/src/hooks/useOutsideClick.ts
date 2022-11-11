import { useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!ref.current || ref.current.contains(target)) return;
      handler(e);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
};

export default useOutsideClick;
