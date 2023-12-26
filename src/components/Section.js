import { twMerge } from "tailwind-merge";
import ErrorBoundary from "./errors/ErrorBoundary";
import { IconAlertTriangle } from "@tabler/icons-react";

function SectionFallback() {
  return (
    <div className="mb-6 md:mb-8 lg:mb-10 rounded-xl p-8 md:p-16 lg:p-20 xl:p-24 flex items-center justify-center bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 border-2 border-semi-dark-blue">
      <div className="text-center">
        <IconAlertTriangle
          width={48}
          height={48}
          stroke={1.2}
          className="mb-4 text-red inline-block"
        />
        <p className="text-lg font-light text-red">
          Oops! Unable to load this section
        </p>
      </div>
    </div>
  );
}

function Section({ as: Element = "section", children, className, ...props }) {
  return (
    <ErrorBoundary fallback={<SectionFallback />}>
      <Element
        className={twMerge("mb-6 md:mb-8 lg:mb-10", className)}
        {...props}
      >
        {children}
      </Element>
    </ErrorBoundary>
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
