import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

CardGlass.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
};

export default function CardGlass({
  as: Element = "div",
  children,
  className,
  ...props
}) {
  const cardCss = twMerge(
    "bg-dark-blue/95 backdrop-blur-xl shadow-2xl shadow-dark-blue",
    className
  );

  return (
    <Element className={cardCss} {...props}>
      {children}
    </Element>
  );
}
