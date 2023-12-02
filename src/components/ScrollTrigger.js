"use client";

import useIntersection from "@/hooks/useIntersection";

import { twMerge } from "tailwind-merge";
import { Spinner } from "@nextui-org/react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useRef } from "react";

ScrollTrigger.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.any,
  root: PropTypes.element,
  threshold: PropTypes.number,
  trigger: PropTypes.func.isRequired,
};

export default function ScrollTrigger({
  as: Element = "div",
  className,
  children,
  root: triggerRoot,
  threshold = 0.5,
  trigger: callback,
  ...props
}) {
  const targetRef = useRef(null);
  const isIntersecting = useIntersection(targetRef, callback, {});

  return (
    <Element
      className={twMerge("text-center p-12 lg:py-20", className)}
      {...props}
    >
      <Spinner
        ref={targetRef}
        color="warning"
        className={classNames(
          "lg:scale-[1.1] 2xl:scale-[1.25] opacity-0 transition-opacity duration-250",
          { "opacity-100": isIntersecting }
        )}
      />
    </Element>
  );
}
