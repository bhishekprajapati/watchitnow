import { useEffect } from "react";

export default function useMount(callback) {
  useEffect(callback, []);
}
