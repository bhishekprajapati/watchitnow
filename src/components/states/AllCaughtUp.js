"use client";

import { twMerge } from "tailwind-merge";
import { IconThumbUpFilled } from "@tabler/icons-react";
import classNames from "classnames";

export default function AllCaughtUp({ variant = "flat", className, ...props }) {
  const iconClasses = classNames(
    "mb-4 p-2",
    "inline-flex items-center justify-center",
    "bg-yellow rounded-full"
  );

  const cardVariant = classNames(
    "aspect-[22/33]",
    "bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50",
    "rounded-xl border-2 border-semi-dark-blue"
  );

  const containerClasses = classNames(
    "w-full flex flex-col items-center justify-center",
    {
      [cardVariant.toString()]: variant === "card",
    }
  );

  return (
    <div className={twMerge(containerClasses, className)} {...props}>
      <span className={iconClasses}>
        <IconThumbUpFilled width={24} height={24} className="text-blue" />
      </span>
      <p className="mb-2 text-sm text-white">All Caught Up!</p>
    </div>
  );
}
