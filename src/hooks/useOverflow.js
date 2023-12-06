import useMount from "@/hooks/useMount";
import useUnmount from "@/hooks/useUnmount";

import { useRef, useState } from "react";

export default function useOverflow(rootRef) {
  const [overflow, setOverflow] = useState({
    first: false,
    last: false,
  });
  const observer = useRef(null);

  // return first direct child of the root
  function getFirstEl() {
    return rootRef.current && rootRef.current.children[0];
  }

  // return last direct child of the root
  function getLastEl() {
    return (
      rootRef.current &&
      rootRef.current.children[rootRef.current.children.length - 1]
    );
  }

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      const isFirst = target === getFirstEl();

      if (!isFirst) {
        setOverflow((prev) => ({
          ...prev,
          last: entry.intersectionRatio < 1,
        }));
        return;
      }

      setOverflow((prev) => ({
        ...prev,
        first: entry.intersectionRatio < 1,
      }));
    });
  };

  useMount(() => {
    if (!rootRef.current) {
      console.error("Invalid root provided!");
      return;
    }

    observer.current = new IntersectionObserver(handleIntersection, {
      root: rootRef.current,
      threshold: 1,
    });

    observer.current.observe(getFirstEl());
    observer.current.observe(getLastEl());
  });

  useUnmount(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  });

  return overflow;
}
