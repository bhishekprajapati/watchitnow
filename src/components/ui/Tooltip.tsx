import type { JSX, FC } from "react";
import React from "react";
import { twMerge as twM } from "tailwind-merge";

type TooltipProps = {
  text: string;
  className?: string;
  children: JSX.Element;
};

const Tooltip: FC<TooltipProps> = function ({ text, children, className }) {
  const css = twM(
    "relative",
    "before:content-[attr(data-tooltip)]",
    "before:absolute before:top-0 before:left-[50%]",
    "before:-translate-x-[50%] before:-translate-y-[100%]",
    "before:px-3 before:py-1 before:rounded-md",
    "before:bg-greyish-blue/10 before:backdrop-blur-md supports-[not_(backdrop-filter:_blur(12px))]:before:bg-greyish-blue",
    "before:text-white before:font-light",
    "before:pointer-events-none",
    "before:opacity-0 [&:hover]:before:opacity-100 [&:hover]:before:-translate-y-[150%]",
    "before:transition-all before:duration-500",
    className
  );

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      "data-tooltip": text,
      className: css,
    });
  });
};

export default Tooltip;
