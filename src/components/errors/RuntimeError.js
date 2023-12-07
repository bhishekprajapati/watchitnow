"use client";

import { IconExclamationCircle } from "@tabler/icons-react";
import { Button } from "@nextui-org/react";

export default function RuntimeError({ reset }) {
  return (
    <div className="rounded-xl p-8 md:p-16 lg:p-20 xl:p-24 flex items-center justify-center bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 border-2 border-semi-dark-blue">
      <div className="text-center">
        <div className="mb-16">
          <IconExclamationCircle
            stroke={1}
            className="mb-4 w-16 h-16 inline-block text-red"
          />
          <p className="text-lg font-light text-red">
            Oops! Something went wrong.Please try again shortly.
          </p>
          <p className="text-lg font-light text-red">
            Thank you for your understanding.
          </p>
        </div>
        <Button variant="faded" color="warning" onClick={reset}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}
