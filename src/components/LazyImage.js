"use client";

import useMount from "@/hooks/useMount";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useState } from "react";
import { useRef } from "react";
import PropTypes from "prop-types";

LazyImage.propTypes = {
  className: PropTypes.string,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  blurSrc: PropTypes.string.isRequired,
  blurDuration: PropTypes.number,
  wrapperProps: PropTypes.object,
};

export default function LazyImage({
  className,
  blurSrc,
  sizes,
  src,
  srcSet,
  blurDuration = 500,
  wrapperProps = {},
  ...props
}) {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { className: wrapperClassName, ...containerProps } = wrapperProps;

  function handleLoad(e) {
    if (imgRef.current) {
      imgRef.current.style.visibility = "visible";
      setIsLoaded(true);
    }
  }

  useMount(() => {
    /**
     * `load` event needs to registered first before adding the `src`
     */
    imgRef.current.addEventListener("load", handleLoad);

    if (sizes) {
      imgRef.current.sizes = sizes;
    }

    if (srcSet) {
      imgRef.current.srcset = srcSet;
    }

    imgRef.current.src = src;
  });

  return (
    <div
      className={twMerge(
        classNames("relative w-full h-full", "transition-[filter] blur-lg", {
          "!blur-0": isLoaded,
        }),
        wrapperClassName
      )}
      style={{
        backgroundImage: `url(${blurSrc})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transitionDuration: `${blurDuration}ms`,
      }}
      {...containerProps}
    >
      <img
        ref={imgRef}
        className={twMerge(
          "absolute top-0 left-0 w-full h-full object-cover object-center",
          className
        )}
        style={{ visibility: "hidden" }}
        data-src={src}
        data-srcset={srcSet}
        data-sizes={sizes}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
