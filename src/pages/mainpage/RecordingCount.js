import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";
import {toMinutes} from '../../utils/convertTime';
import './RecordingCount.scss';

export default function RecordingCount() {
  const [count, setCount] = useState(0);
  const [delay] = useState(1000);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  return <div className="recording-count"> <div className='recording-count__dot'/> {toMinutes(count)}</div>;
}