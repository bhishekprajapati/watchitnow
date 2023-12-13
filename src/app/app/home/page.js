import Section from "@/components/Section";
import ErrorFetch from "@/components/states/ErrorFetch";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";
import { getTrendingMedia } from "@/services/moviedb";
import MediaDisplayList from "../_components/MediaDisplayList";
import ShowMoreCard from "../_components/ShowMoreCard";

import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { Suspense } from "react";
import Carousel, { Slide } from "@/components/Carousel";
import classNames from "classnames";
import { motion } from "framer-motion";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

async function TrendingCarousel() {
  const res = await getTrendingMedia();

  return <Carousel slidesData={res.data} className="mb-8 rounded-lg" />;
}

export default async function Page() {
  return (
    <>
      <div className="mb-8">
        <TrendingCarousel />
      </div>
    </>
  );
}
