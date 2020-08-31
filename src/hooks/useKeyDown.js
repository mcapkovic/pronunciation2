import { useEffect, useRef } from "react";

// Hook
export function useKeyDown(targetKey, callback, dependencies = []) {
  const lastPressedKey = useRef(null);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    lastPressedKey.current = key;
    if (key === targetKey && callback) {
      callback();
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKey,...dependencies ]); // Empty array ensures that effect is only run on mount and unmount

  return lastPressedKey.current;
}
