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

  const classes = classNames("tooltip", className || "");

  return (
    <PlainBadge data-tooltip={tooltip} className={classes}>
      {children}
    </PlainBadge>
  );
}
