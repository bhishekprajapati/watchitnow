"use client";

import useMount from "@/hooks/useMount";
import { debounce } from "@/utils";

import PropTypes from "prop-types";
import { useRef } from "react";

FormField.propTypes = {
  type: PropTypes.oneOf(["text"]).isRequired,
  className: PropTypes.string,
  onInputDebounced: PropTypes.func,
  onInputDebouncedDelay: PropTypes.number,
};

export default function FormField({
  type,
  className,
  onInputDebounced,
  onInputDebouncedDelay = 250,
  ...props
}) {
  const input = useRef(null);

  useMount(() => {
    if (onInputDebounced) {
      const callback = debounce(onInputDebouncedDelay, onInputDebounced);
      const handleInput = (event) => {
        callback(event);
      };
      input.current.addEventListener("input", handleInput);
    }
  });

  return <input ref={input} type={type} className={className} {...props} />;
}
