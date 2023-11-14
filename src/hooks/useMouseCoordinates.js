import { useEffect, useState } from "react";

export default function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState({ x: null, y: null });

  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    setCoordinates({ x: clientX, y: clientY });
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return coordinates;
}
