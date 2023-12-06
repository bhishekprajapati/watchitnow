import useOverflow from "@/hooks/useOverflow";

import React, { useRef } from "react";
import classNames from "classnames";

export default function OverflowIndicator(Component, props) {
  const rootRef = useRef(null);
  const overflow = useOverflow(rootRef);

  const containerClasses = classNames(
    "overflow-indicators",
    { "show-left": overflow.first },
    { "show-right": overflow.last }
  );

  return (
    <div className={containerClasses}>
      <Component ref={rootRef} {...props} />
    </div>
  );
}
