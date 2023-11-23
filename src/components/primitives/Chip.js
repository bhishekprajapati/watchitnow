import { twMerge as twM } from "tailwind-merge";
import PropTypes from "prop-types";

Chip.propTypes = {
  className: PropTypes.string,
};

export default function Chip(props) {
  const css = twM(
    "p-0.5 px-2 rounded-md bg-greyish-blue/25 text-white/90",
    props.className
  );

  return (
    <span {...props} className={css}>
      {props.children}
    </span>
  );
}
