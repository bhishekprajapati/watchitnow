"use client";

import RuntimeError from "@/components/errors/RuntimeError";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log("Page Error: ", error);
  }, [error]);

  return <RuntimeError reset={reset} />;
}
