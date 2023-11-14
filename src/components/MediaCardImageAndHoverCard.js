"use client";

import { useRef, useEffect, useState } from "react";

function HoverCard({ data, src, pos }) {
  const [initialPosition, setInitialPosition] = useState({
    x: "10%",
    y: "10%",
  });
  const hoverCardRef = useRef(null);

  return (
    <div
      ref={hoverCardRef}
      style={{
        top: initialPosition.y,
        left: initialPosition.x,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
      className="absolute hidden pointer-events-none group-hover:block z-50 bg-transparent w-[10rem] h-[16rem] rounded-lg overflow-hidden"
    >
      <div className="relative w-full h-full">
        <img
          src={src}
          className="absolute w-full h-full object-cover object-center"
        />

        <div className="relative w-full h-full supports-[backdrop-filter]:backdrop-blur-2xl bg-white/20 p-4 pb-0">
          <p className="text-white text-[.8rem] font-medium line-clamp-6">
            {data?.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MediaCardImageAndHoverCard({ data }) {
  const { posterPath } = data;
  const [loadedSrc, setLoadedSrc] = useState("");
  const [hoverCardPos, setHoverCardPos] = useState({ x: 0, y: 0 });
  const posterImgRef = useRef(null);

  useEffect(() => {
    setLoadedSrc(posterImgRef.current.currentSrc);
  }, []);

  function handleMouseMove(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    setHoverCardPos({ x: offsetX, y: offsetY });
  }

  return (
    <picture
      className="relative group w-full h-[12rem]"
      onMouseMove={handleMouseMove}
    >
      <source
        srcSet={`https://www.themoviedb.org/t/p/original${posterPath}`}
        media="(min-width: 1800px)"
      />
      <source
        srcSet={`https://www.themoviedb.org/t/p/w780${posterPath}`}
        media="(min-width: 1260px)"
      />
      <source
        srcSet={`https://www.themoviedb.org/t/p/w500${posterPath}`}
        media="(min-width: 768px)"
      />
      <source
        srcSet={`https://www.themoviedb.org/t/p/w342${posterPath}`}
        media="(min-width: 425px)"
      />
      <img
        ref={posterImgRef}
        className="w-full h-full rounded-2xl object-cover object-center"
        src={`https://www.themoviedb.org/t/p/w154${posterPath}`}
      />
      {loadedSrc ? (
        <HoverCard data={data} pos={hoverCardPos} src={loadedSrc} />
      ) : (
        ""
      )}
    </picture>
  );
}
