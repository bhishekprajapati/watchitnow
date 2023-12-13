import { twMerge } from "tailwind-merge";

function Section({ as: Element = "section", children, className, ...props }) {
  return (
    <Element className={twMerge("mb-6 md:mb-8 lg:mb-10", className)} {...props}>
      {children}
    </Element>
  );
}

Section.Header = ({
  as: Element = "header",
  children,
  className,
  ...props
}) => {
  const classes = twMerge(
    "text-heading-sm md:text-heading-md lg:text-heading-lg !font-semibold mb-4 md:mb-6 lg:mb-8",
    className
  );
  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

Section.Title = ({ as: Element = "h2", children, className, ...props }) => {
  const title = twMerge(
    "rounded-md py-1 pl-[.5em] pr-[2em] inline-block bg-gradient-to-r from-semi-dark-blue",
    className
  );
  return (
    <Element className={title} {...props}>
      {children}
    </Element>
  );
};

Section.Content = ({ as: Element = "div", children, className, ...props }) => {
  return (
    <Element className={className} {...props}>
      {children}
    </Element>
  );
};

export default Section;
