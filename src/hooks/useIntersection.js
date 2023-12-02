"use client";

import useMount from "@/hooks/useMount";
import useUnmount from "@/hooks/useUnmount";

import { useRef, useState } from "react";

export default function useIntersection(
  elementRef,
  callback,
  { root, threshold = 0.5, once = false }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useRef(null);
  const targetRef = elementRef;

  function disconnect() {
    if (observer.current) {
      observer.current?.disconnect();
    }
  }

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.intersectionRatio >= threshold) {
      setIsIntersecting(true);

      if (once) {
        disconnect();
      }

      callback();
      return;
    }

    setIsIntersecting(false);
  };

  useMount(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      root: root ?? document.body,
      threshold: threshold ?? 0.5,
    });
    observer.current.observe(targetRef.current);
  });

  useUnmount(disconnect);

  return isIntersecting;
}
