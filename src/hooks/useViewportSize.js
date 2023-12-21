"use client";

import { isServer } from "@/utils";
import useMount from "./useMount";
import useUnmount from "./useUnmount";

import { useState } from "react";

export default function useViewportSize() {
  const [size, setSize] = useState({
    width: isServer() ? 0 : window.innerWidth,
    height: isServer() ? 0 : window.innerHeight,
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
