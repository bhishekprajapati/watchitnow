"use client";

import { twMerge } from "tailwind-merge";
import { Spinner } from "@nextui-org/react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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
  const isIntersecting = useInView(targetRef, {
    margin: "100%",
  });

  useEffect(() => {
    if (isIntersecting) {
      callback();
    }
  }, [isIntersecting]);

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
