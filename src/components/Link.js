"use client";

import NextLink from "next/link";
import NProgress from "nprogress";
import "@/app/nprogress.css";
import { useEffect } from "react";

NProgress.configure({ showSpinner: false });

export default function Link({ href, children, ...props }) {
  useEffect(() => {
    return () => {
      NProgress.done();
    };
  });

  return (
    <NextLink onClick={() => NProgress.start()} href={href} {...props}>
      {children}
    </NextLink>
  );
}
