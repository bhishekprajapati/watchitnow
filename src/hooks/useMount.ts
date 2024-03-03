import { type EffectCallback, useEffect } from "react";

export default function useMount(callback: EffectCallback) {
  useEffect(callback, []);
}
