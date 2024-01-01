import { Button } from "@nextui-org/react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function ButtonPlay({ className, size = "sm", ...props }) {
  const bttn = classNames(
    "scale-[2] opacity-0",
    "group-hover:scale-[1.5] group-hover:opacity-100",
    "transition-all",
    "rounded-full shadow-2xl shadow-black"
  );

  return (
    <Button
      type="button"
      color="warning"
      size={size}
      className={twMerge(bttn, className)}
      isIconOnly
      {...props}
    >
      <IconPlayerPlayFilled size={16} />
    </Button>
  );
}
