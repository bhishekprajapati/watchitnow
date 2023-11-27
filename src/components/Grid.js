import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export function GridContainer({
  as: Element = "ul",
  className,
  children,
  ...props
}) {
  const classes = classNames(
    "overflow-x-auto",
    "scrollbar-none [@media(hover:hover)]:scrollbar [@media(hover:hover)]:pb-2",
    "whitespace-nowrap lg:whitespace-normal [&>*]:inline-block",
    "[&>*]:w-24 sm:[&>*]:w-28 md:[&>*]:w-36 [&>:not(:last-child)]:mr-2",
    "lg:[&>*]:w-full lg:[&>:not(:last-child)]:mr-0",
    "lg:grid lg:grid-cols-5 lg:gap-6",
    "xl:grid-cols-6",
    "2xl:grid-cols-7"
  );
  return (
    <Element className={twMerge(classes, className)} {...props}>
      {children}
    </Element>
  );
}

export function GridItem({
  as: Element = "li",
  className,
  children,
  ...props
}) {
  return (
    <Element className={className} {...props}>
      {children}
    </Element>
  );
}
