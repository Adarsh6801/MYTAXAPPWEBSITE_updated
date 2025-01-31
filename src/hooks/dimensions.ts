import { useState, useEffect } from "react";
import { getWidth } from "../helpers/dimensions";

export const useCurrentWidth = () => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
};
