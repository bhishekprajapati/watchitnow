"use client";

import ButtonPlay from "./ButtonPlay";
import Section from "@/components/ui/Section";
import { Media } from "@/components/MediaCard";
import useViewportSize from "@/hooks/useViewportSize";
import { MediaLink } from "@/components/MediaCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { Button } from "@nextui-org/react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRef } from "react";
import classNames from "classnames";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const AttachSlideControls = ({ setter }) => {
  const swiper = useSwiper();
  setter(swiper);
  return <></>;
};

function MediaSlide({ media, isBreakpoint }) {
  const containerRef = useRef(null);
  const container = classNames(
    "relative group",
    "aspect-[22/33] sm:aspect-video rounded-lg overflow-hidden",
    "transition-shadow duration-[2000ms]",
    "shadow-2xl shadow-dark-blue select-none"
  );

  return (
    <MediaLink type={media.type} id={media.id} className="block">
      <div ref={containerRef} className={container}>
        {isBreakpoint ? (
          <Media.Backdrop path={media.backdropPath} />
        ) : (
          <Media.Poster path={media.posterPath} />
        )}
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <ButtonPlay className="invisible [@media(hover:hover)]:visible" />
        </div>
      </div>
    </MediaLink>
  );
}

export default function Carousel({ dataList = [] }) {
  const viewport = useViewportSize();
  let swiper;

  const isBreakpoint = viewport.width >= 640;
  const effectModules = isBreakpoint ? [] : [EffectCoverflow];
  const effectName = isBreakpoint ? "fade" : "coverflow";
  const slidesPerView = isBreakpoint ? 1.8 : 2;

  function setSwiper(instance) {
    swiper = instance;
  }

  return (
    <Section>
      <Section.Header className="flex items-center">
        <Section.Title>Trending Today</Section.Title>
        <div className={classNames("ml-auto", { hidden: !isBreakpoint })}>
          <Button
            onClick={() => swiper?.slideNext()}
            variant="solid"
            size="lg"
            className="mr-4 rounded-full bg-semi-dark-blue"
            isIconOnly
          >
            <IconChevronLeft className="text-white" stroke={3} />
          </Button>
          <Button
            onClick={() => swiper?.slidePrev()}
            variant="solid"
            size="lg"
            className="rounded-full bg-semi-dark-blue"
            isIconOnly
          >
            <IconChevronRight className="text-white" stroke={3} />
          </Button>
        </div>
      </Section.Header>
      <Section.Content className="overflow-indicators show-left show-right">
        <Swiper
          className="mb-6"
          modules={[...effectModules]}
          effect={effectName}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          breakpoints={{
            640: {
              spaceBetween: 30,
            },
          }}
          centeredSlides
          loop
        >
          {dataList?.map((media) => {
            return (
              <SwiperSlide key={media.id}>
                <MediaSlide media={media} isBreakpoint={isBreakpoint} />
              </SwiperSlide>
            );
          })}

          <AttachSlideControls setter={setSwiper} />
        </Swiper>
      </Section.Content>
    </Section>
  );
}
