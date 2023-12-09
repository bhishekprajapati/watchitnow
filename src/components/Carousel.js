"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { IconCaretRightFilled, IconCaretLeftFilled } from "@tabler/icons-react";
import Tilt from "react-parallax-tilt";

// constants
const DIRECTION = {
  LEFT: 1,
  RIGHT: -1,
};

const SWIPE_THRESHOLD = 10000 * 2;

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function carousel({ slidesData = [] }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideData = slidesData[wrap(0, slidesData.length, page)];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  async function handleSwipe(e, { offset, velocity }) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe > SWIPE_THRESHOLD) {
      paginate(DIRECTION.RIGHT);
      return;
    }

    if (swipe < -SWIPE_THRESHOLD) {
      paginate(DIRECTION.LEFT);
      return;
    }
  }

  return (
    <Tilt tiltMaxAngleX={0.5} tiltMaxAngleY={0.5} transitionSpeed={800}>
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7] overflow-hidden shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={slideData.backdropPath}
              className="w-full h-full object-cover object-center select-none rounded-lg"
              src={`https://www.themoviedb.org/t/p/original/${slideData.backdropPath}`}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ right: 0, left: 0 }}
              // dragElastic={0.8}
              onDragEnd={handleSwipe}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>
        </div>
        <div className="absolute top-[50%] right-4 -translate-y-[50%] opacity-0 [@media(hover:hover)]:opacity-100">
          <div
            className="inline-flex p-4 text-white bg-dark-blue rounded-full"
            onClick={() => paginate(DIRECTION.RIGHT)}
          >
            <IconCaretRightFilled />
          </div>
        </div>
        <div className="absolute top-[50%] left-4 -translate-y-[50%] opacity-0 [@media(hover:hover)]:opacity-100">
          <div
            className="inline-flex p-4 text-white bg-dark-blue rounded-full"
            onClick={() => paginate(DIRECTION.LEFT)}
          >
            <IconCaretLeftFilled />
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default carousel;
