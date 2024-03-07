"use client";

import Chip from "@/components/ui/Chip";
import useMouseCoordinates from "@/hooks/useMouseCoordinates";
import { useState } from "react";

import { useEffect } from "react";

export default function MediaHoverCard({}) {
  const [overview, setOverview] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { x, y } = useMouseCoordinates();

  function show(card) {
    const data = card.dataset;
    setOverview(data.overview);
    setTitle(data.title);
    setReleaseYear(data.year);
    setImgSrc(card.querySelector("img").src);
    setIsVisible(true);
  }

  function hide() {
    setIsVisible(false);
  }

  useEffect(() => {
    document.body.addEventListener("mouseover", (e) => {
      const mediaCard = e.target.closest("[data-media-card]");
      if (!mediaCard) {
        hide();
        return;
      }
      show(mediaCard);
    });
  }, []);

  return (
    <div
      className="hidden [@media(hover:hover)]:block fixed z-[1000] mt-4 ml-4 rounded-md overflow-hidden pointer-events-none"
      style={{ left: `${x}px`, top: `${y}px`, opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="w-48 aspect-[22/33] shadow-2xl shadow-dark-blue"
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
      >
        <div className="p-4 w-full h-full bg-dark-blue/75 backdrop-blur-2xl ">
          <h3 className="mb-3 text-xl line-clamp-3 text-yellow font-semibold">
            {title}
          </h3>
          <Chip className="mb-6">{releaseYear}</Chip>

          <p className="line-clamp-4">{overview}</p>
        </div>
      </div>
    </div>
  );
}
