import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { forwardRef } from "react";

const Grid = forwardRef(
  ({ as: Element = "ul", className, children, strict, ...props }, ref) => {
    const scrollableLayoutClasses = classNames(
      "overflow-x-auto",
      "scrollbar-none [@media(hover:hover)]:scrollbar [@media(hover:hover)]:pb-2",
      "whitespace-nowrap lg:whitespace-normal [&>*]:inline-block",
      "[&>*]:w-24 sm:[&>*]:w-28 md:[&>*]:w-36 [&>:not(:last-child)]:mr-3",
      "lg:[&>*]:w-full lg:[&>:not(:last-child)]:mr-0"
    );

    const gridLayoutClasses = classNames(
      "grid grid-cols-3 gap-4",
      "sm:grid-cols-4",
      "md:grid-cols-5 md:gap-6"
    );

    const classes = classNames(
      strict ? gridLayoutClasses : scrollableLayoutClasses,
      "lg:grid lg:grid-cols-5 lg:gap-6",
      "xl:grid-cols-6",
      "2xl:grid-cols-7"
    );

    return (
      <Element className={twMerge(classes, className)} ref={ref} {...props}>
        {children}
      </Element>
    );
  }
);

export default Grid;
