"use client";

import { useEffect, forwardRef } from "react";
import NextLink from "next/link";
import NProgress from "nprogress";
import "@/app/nprogress.css";

NProgress.configure({ showSpinner: false });

function Link({ href, children, className, ...props }, ref) {
  useEffect(() => {
    return () => {
      NProgress.done();
    };
  });

  return (
    <NextLink
      onClick={() => NProgress.start()}
      href={href}
      {...props}
      className={className}
      ref={ref}
    >
      {children}
    </NextLink>
  );
}

export default forwardRef(Link);
