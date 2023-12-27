"use client";

import useOverflow from "@/hooks/useOverflow";

import { twMerge } from "tailwind-merge";
import { useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

function getElementWidth(el) {
  return el.getBoundingClientRect().width;
}

function scrollLeft(listRef) {
  if (listRef.current) {
    const list = listRef.current;
    const listWidth = getElementWidth(list);
    const listItemWidth = getElementWidth(list.children[0]);
    const count = Math.floor(listWidth / listItemWidth);
    const totalGap = (count - 1) * parseFloat(getComputedStyle(list).columnGap);
    list.scrollLeft += count * listItemWidth + totalGap;
    return;
  }

  console.error("List ref can't be null!");
}

function scrollRight(listRef) {
  if (listRef.current) {
    const list = listRef.current;
    const listWidth = getElementWidth(list);
    const listItemWidth = getElementWidth(list.children[0]);
    const count = Math.floor(listWidth / listItemWidth);
    const totalGap = (count - 1) * parseFloat(getComputedStyle(list).columnGap);
    list.scrollLeft -= count * listItemWidth + totalGap;
    return;
  }

  console.error("List ref can't be null!");
}

List.propTypes = {
  as: PropTypes.elementType,
  scrollable: PropTypes.oneOf(["horizontal", "vertical"]),
  children: PropTypes.any,
  className: PropTypes.string,
};

const NavButton = ({ children, className, ...props }) => {
  const classes = classNames(
    "hidden opacity-0 [@media(hover:hover)]:flex items-center justify-center",
    "absolute top-0 bottom-0 z-[60] w-12",
    "from-dark-blue shadow-xl shadow-black/25 transition-opacity duration-500"
  );

  return (
    <button type="button" className={twMerge(classes, className)} {...props}>
      {children}
    </button>
  );
};

export default function List({
  as: List = "ul",
  scrollable = "vertical",
  children,
  className,
  ...props
}) {
  const horizontalScrollable = classNames(
    "pr-5 lg:pr-8",
    "overflow-x-auto scrollbar-none",
    "grid grid-flow-col auto-cols-[1fr] gap-x-4",
    "snap-x snap-mandatory"
  );

  const verticalScrollable = classNames();

  const isHorizontalScrollable = scrollable === "horizontal";

  const listClasses = classNames(
    "scroll-smooth",
    isHorizontalScrollable
      ? horizontalScrollable.toString()
      : verticalScrollable.toString()
  );

  const listRef = useRef(null);
  const overflow = scrollable === "horizontal" && useOverflow(listRef);
  const overflowClasses = classNames(
    "[&:hover>:last-child]:opacity-100 [&:hover>:first-child]:opacity-100",
    overflow ? "[@media(hover:hover)]:overflow-indicators" : "",
    overflow?.first ? "[@media(hover:hover)]:show-left" : "",
    overflow?.last ? "[@media(hover:hover)]:show-right" : ""
  );

  function onScrollLeft() {
    scrollLeft(listRef);
  }

  function onScrollRight() {
    scrollRight(listRef);
  }

  return (
    <div className={overflowClasses}>
      {isHorizontalScrollable && overflow.first && (
        <NavButton
          className="group left-0 bg-gradient-to-r rounded-tl-lg rounded-bl-lg"
          onClick={onScrollRight}
        >
          <IconChevronLeft
            className="group-hover:text-yellow -translate-y-[120%] -translate-x-[50%]"
            stroke={2.5}
          />
        </NavButton>
      )}
      <List
        ref={listRef}
        className={twMerge(listClasses, className)}
        {...props}
      >
        {children}
      </List>
      {isHorizontalScrollable && overflow.last && (
        <NavButton
          className="group right-0 bg-gradient-to-l rounded-tr-lg rounded-br-lg"
          onClick={onScrollLeft}
        >
          <IconChevronRight
            className="group-hover:text-yellow -translate-y-[120%] translate-x-[50%]"
            stroke={2.5}
          />
        </NavButton>
      )}
    </div>
  );
}

List.Item = ({ as: ListItem = "li", children, className, ...props }) => {
  const classes = classNames("snap-start");

  return (
    <ListItem className={twMerge(classes, className)} {...props}>
      {children}
    </ListItem>
  );
};
