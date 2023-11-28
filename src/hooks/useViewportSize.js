import useMount from "./useMount";
import useUnmount from "./useUnmount";

import { useState } from "react";

export default function useViewportSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = (e) => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useMount(() => window.addEventListener("resize", handleResize));
  useUnmount(() => window.removeEventListener("resize", handleResize));

  return size;
}
