import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";

export default function RecordingCount() {
  const [count, setCount] = useState(0);
  const [delay] = useState(1000);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  return <span className="sub-text">{count}</span>;
}