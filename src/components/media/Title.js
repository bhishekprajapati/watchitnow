import { twMerge } from "tailwind-merge";

export default function Title({
  as: Element = "h3",
  className,
  children,
  ...props
}) {
  const mergedClasses = twMerge(
    "text-[0.875rem] md:text-[1.125rem] text-white font-medium line-clamp-1",
    className
  );

  return (
    <Element className={mergedClasses} {...props}>
      {children}
    </Element>
  );
}
