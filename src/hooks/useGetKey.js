import { useEffect, useState } from "react";

export function useGetKey() {
  const [lastPressedKey, setLastPressedKey] = useState(null);

  function downHandler({ key }) {
    setLastPressedKey(key);
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return lastPressedKey;
}
