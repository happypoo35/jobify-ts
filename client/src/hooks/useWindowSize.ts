import { useState, useEffect, useMemo } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktop = windowSize.width > 1024;
  const tablet = useMemo(() => windowSize.width <= 768, [windowSize.width]);
  const mobile = windowSize.width <= 576;

  return { desktop, tablet, mobile, windowSize };
};

export default useWindowSize;
