import { useState, useEffect } from "react";

function useActiveElement() {
  const [activeElement, setActiveElement] =
    useState<typeof document.activeElement>(null);

  useEffect(() => {
    const handleFocusChange = () => {
      setActiveElement(document.activeElement);
    };

    document.addEventListener("focusin", handleFocusChange);
    document.addEventListener("focusout", handleFocusChange);

    return () => {
      document.removeEventListener("focusin", handleFocusChange);
      document.removeEventListener("focusout", handleFocusChange);
    };
  }, []);

  return activeElement;
}

export default useActiveElement;
