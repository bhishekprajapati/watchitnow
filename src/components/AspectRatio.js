import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

AspectRatio.propTypes = {
  as: PropTypes.elementType,
  value: PropTypes.number,
};

export default function AspectRatio({
  as: Element = "div",
  value = 1,
  className,
  children,
  ...props
}) {
  const css = twMerge("relative inline-block w-full", className);
  const pt = 100 / value;

  return (
    <Element
      className={css}
      style={{
        paddingTop: `${pt}%`,
      }}
      {...props}
    >
      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </Element>
  );
}
