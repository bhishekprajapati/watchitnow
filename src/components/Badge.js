import classNames from "classnames";

const PlainBadge = (props) => {
  const classes = classNames(
    "p-0.5 px-2 rounded-md bg-greyish-blue/25 text-white/90",
    props?.className || ""
  );
  return (
    <span {...props} className={classes}>
      {props.children}
    </span>
  );
};

export default function Badge({ children, tooltip, className }) {
  if (!tooltip) {
    return <PlainBadge className={className || ""}>{children}</PlainBadge>;
  }

  const classes = classNames(
    "relative",
    "before:content-[attr(data-tooltip)]",
    "before:absolute before:top-0 before:left-[50%]",
    "before:-translate-x-[50%] before:-translate-y-[100%]",
    "before:px-3 before:py-1 before:rounded-md",
    "before:bg-greyish-blue/10 before:backdrop-blur-md supports-[not_(backdrop-filter:_blur(12px))]:before:bg-greyish-blue",
    "before:text-white before:font-light",
    "before:pointer-events-none",
    "before:opacity-0 [&:hover]:before:opacity-100 [&:hover]:before:-translate-y-[150%]",
    "before:transition-all before:duration-500",
    className || ""
  );

  return (
    <PlainBadge data-tooltip={tooltip} className={classes}>
      {children}
    </PlainBadge>
  );
}
