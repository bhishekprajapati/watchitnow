"use client";

import useIntersection from "@/hooks/useIntersection";

import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { IconThumbUpFilled } from "@tabler/icons-react";
import classNames from "classnames";

export default function AllCaughtUp({ variant = "flat", className, ...props }) {
  const iconRef = useRef(null);
  const isIntersecting = useIntersection(iconRef, () => {}, { once: true });
  const iconClasses = classNames(
    "mb-4 p-2",
    "inline-flex items-center justify-center",
    "bg-yellow rounded-full",
    { "thumbs-up": isIntersecting }
  );

  const cardVariant = classNames(
    "bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50",
    "rounded-xl border-2 border-semi-dark-blue h-[82%]"
  );

  const containerClasses = classNames(
    "p-8 py-16 flex flex-col items-center justify-center",
    {
      [cardVariant.toString()]: variant === "card",
    }
  );

  return (
    <div className={twMerge(containerClasses, className)} {...props}>
      <span ref={iconRef} className={iconClasses}>
        <IconThumbUpFilled width={24} height={24} className="text-blue" />
      </span>
      <p className="mb-2 text-lg text-white">All Caught Up!</p>
    </div>
  );
}
