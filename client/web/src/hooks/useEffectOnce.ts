import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useEffectOnce(
  effect: EffectCallback,
  deps?: DependencyList | undefined
) {
  const onceRef = useRef(false);
  useEffect(() => {
    if (onceRef.current !== true) {
      effect();
    }
    onceRef.current = true;
  }, deps);
  return;
}
