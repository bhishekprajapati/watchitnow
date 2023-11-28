import { useEffect } from "react";

export default function useUnmount(callback) {
  useEffect(() => {
    return callback;
  }, []);
}
