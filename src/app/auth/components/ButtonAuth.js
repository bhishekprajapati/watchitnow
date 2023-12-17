"use client";

import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function ButtonAuth({
  className,
  children,
  provider,
  callbackUrl,
  preserveCallbackInitiator,
  ...props
}) {
  const bttn = twMerge("bg-dark-blue text-white shadow-dark-blue", className);
  const params = useSearchParams();

  // callback initiator
  const initiatorCallbackUrl = params.get("callbackUrl");

  if (preserveCallbackInitiator) {
    callbackUrl = initiatorCallbackUrl;
  }

  return (
    <Button
      variant="shadow"
      className={bttn}
      {...props}
      onClick={() =>
        signIn(provider.id, {
          callbackUrl,
        })
      }
    >
      {children}
    </Button>
  );
}
