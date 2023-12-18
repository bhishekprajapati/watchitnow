import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function IconLogo({
  className,
  width = 24,
  height = 24,
  ...props
}) {
  return (
    <Image
      width={width}
      height={height}
      className={twMerge("inline-block", className)}
      src="/logo.svg"
      alt="logo"
      {...props}
    />
  );
}
