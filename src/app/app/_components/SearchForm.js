import { Input } from "@/components/primitives";

import React from "react";
import PropTypes from "prop-types";
import { IconSearch } from "@tabler/icons-react";
import { Spinner } from "@nextui-org/react";

SearchForm.propTypes = {
  onInput: PropTypes.func.isRequired,
  debounce: PropTypes.bool,
  delay: PropTypes.number,
};

export default function SearchForm({
  onInput,
  isLoading = false,
  debounce,
  delay = 250,
  ...props
}) {
  const InputElement = (
    <Input
      type="text"
      name="query"
      id="query"
      placeholder="Search for movies and TV series"
      className="order-2 field-input block w-full [&:focus+span]:translate-x-[0] [&:focus~label]:text-white"
      {...props}
    />
  );

  return (
    <form
      id="search-form"
      className="px-5 py-3 flex items-center gap-x-4 bg-semi-dark-blue/50 rounded-xl"
    >
      {debounce
        ? React.cloneElement(InputElement, {
            onInputDebounced: onInput,
            onInputDebouncedDelay: delay,
          })
        : React.cloneElement(InputElement, {
            onInput,
          })}
      <label
        htmlFor="query"
        className="order-1 text-white/25 transition-colors duration-500 cursor-pointer"
      >
        {isLoading ? (
          <Spinner size="sm" color="warning" className="w-6 h-6" />
        ) : (
          <IconSearch stroke={2} />
        )}
      </label>
    </form>
  );
}
