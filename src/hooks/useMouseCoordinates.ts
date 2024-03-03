import { useEffect, useState } from "react";

type Coordinates = { x: number | null; y: number | null };

export default function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: null,
    y: null,
  });

  function handleMouseMove(e: globalThis.MouseEvent) {
    setCoordinates({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return coordinates;
}
