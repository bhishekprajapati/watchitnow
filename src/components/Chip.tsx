import type { FC, ReactNode } from "react";
import { twMerge as twM } from "tailwind-merge";

const Chip: FC<{ className?: string; children: ReactNode }> = function ({
  children,
  className = "",
  ...props
}) {
  const css = twM(
    "p-0.5 px-2 rounded-md bg-greyish-blue/25 text-white/90",
    className
  );

  return (
    <span {...props} className={css}>
      {children}
    </span>
  );
};

export default Chip;
