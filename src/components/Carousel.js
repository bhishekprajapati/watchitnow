"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import {
  IconCaretRightFilled,
  IconCaretLeftFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Tilt from "react-parallax-tilt";
import { Button } from "@nextui-org/react";

// constants
const DIRECTION = {
  LEFT: 1,
  RIGHT: -1,
};

const SWIPE_THRESHOLD = 10000;

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

  /**
   * Slide image loading strategy: For inifinte pagination
   * preload first and last two images
   * prefetch remaining images
   */

  return (
    <>
      <div className="relative">
        {slidesData.map((data, idx) => (
          <link
            key={data.backdropPath}
            rel={
              idx < 2 || idx > slidesData.length - 3 ? "preload" : "prefetch"
            }
            as="image"
            href={`https://image.tmdb.org/t/p/original${data.backdropPath}`}
          />
        ))}

        <Tilt tiltMaxAngleX={0.2} tiltMaxAngleY={0.2} transitionSpeed={800}>
          <div className="relative">
            <div className="relative aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7] xl:aspect-[16/7] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={slideData.backdropPath}
                  className="inline-block w-full h-full object-cover object-center select-none rounded-lg shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]"
                  src={`https://image.tmdb.org/t/p/original${slideData.backdropPath}`}
                  variants={variants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ right: 0, left: 0 }}
                  onDragEnd={handleSwipe}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                />
              </AnimatePresence>
              <Button
                variant="shadow"
                color="warning"
                size="lg"
                className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-full md:scale-[1.5]"
                isIconOnly
              >
                <IconPlayerPlayFilled />
              </Button>
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
      </div>
      <div className="w-full text-center">
        <div className="p-8 inline-flex items-center justify-center gap-x-2">
          <span className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/25 scale-[0.6]"></span>
          <span className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/50 scale-80"></span>
          <span className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-yellow"></span>
          <span className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/50 scale-80"></span>
          <span className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/25 scale-[0.6]"></span>
        </div>
      </div>
    </>
  );
}

export default carousel;
