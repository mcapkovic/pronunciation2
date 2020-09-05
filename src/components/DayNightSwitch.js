import React from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DayNightSwitch.scss";

function convertRangeValue(OldValue, NewMin, NewMax, OldMin = 0, OldMax = 100) {
  const OldRange = OldMax - OldMin;
  const NewRange = NewMax - NewMin;
  return ((OldValue - OldMin) * NewRange) / OldRange + NewMin;
}

const colorVariables = [
  {
    name: "--primary-text-lum",
    min: 10,
    max: 100,
  },
  {
    name: "--main-bg-color-lum",
    min: 100,
    max: 20,
  },
  {
    name: "--main-icon-lum",
    min: 31,
    max: 100,
  },
  {
    name: "--title-border-color-lum",
    min: 10,
    max: 100,
  },
];

// function bezierCurve(
//   t,
//   points = [
//     [0, 0],
//     [0.5, 0.5],
//     [1, 1]
//   ]
// ) {
//   const p1 = points[0];
//   const p2 = points[1];
//   const p3 = points[2];

//   // const pX = (1 - t) * p1[0] + t * p2[0];
//   // const pY = (1 - t) * p1[1] + t * p2[1];

//   const pX  = Math.pow((1-t), 2) * p1[0] + 2*(1-t)*t*p2[0] + Math.pow(t, 2)* p3[0]
//   const pY  = Math.pow((1-t), 2) * p1[1] + 2*(1-t)*t*p2[1] + Math.pow(t, 2)* p3[1]

//   // function equation()
//   return [pX, pY];
// }

function bezier(t, p0, p1, p2, p3) {
  const cX = 3 * (p1.x - p0.x),
    bX = 3 * (p2.x - p1.x) - cX,
    aX = p3.x - p0.x - cX - bX;

  const cY = 3 * (p1.y - p0.y),
    bY = 3 * (p2.y - p1.y) - cY,
    aY = p3.y - p0.y - cY - bY;

  const x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
  const y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;

  return { x, y };
}

const p0 = { x: 0, y: 0 },
  p1 = { x: 100, y: 0 },
  p2 = { x: 0, y: 100 },
  p3 = { x: 100, y: 100 };

function DayNightSwitch() {
  const inputRef = React.useRef();
  const firstRender = React.useRef(true);

  const onChange = (e) => {
    localStorage.setItem("theme-range", e.target.value);
    const value = bezier(e.target.value / 100, p0, p1, p2, p3).y;

    colorVariables.forEach((variable) => {
      document.documentElement.style.setProperty(
        variable.name,
        convertRangeValue(value, variable.min, variable.max) + "%"
        // convertRangeValue(e.target.value, variable.min, variable.max) + "%"
      );
    });
  };

  if (firstRender) {
    const savedValue = localStorage.getItem("theme-range");
    if (savedValue && savedValue > 0)
      onChange({ target: { value: savedValue } });
  }

  const onDayClick = () => {
    inputRef.current.value = 0;
    onChange({ target: { value: 0 } });
  };

  const onNightClick = () => {
    inputRef.current.value = 100;
    onChange({ target: { value: 100 } });
  };

  React.useEffect(() => {
    firstRender.current = false;
    const savedValue = localStorage.getItem("theme-range") || 0;
    inputRef.current.value = savedValue;
  }, []);

  return (
    <div className="day-night-switch">
      <button onClick={onDayClick}>
        <FontAwesomeIcon icon={faSun} size="1x" />
      </button>
      <input
        className="day-night-switch__range"
        ref={inputRef}
        onChange={onChange}
        type="range"
      />
      <button onClick={onNightClick}>
        <FontAwesomeIcon icon={faMoon} size="1x" />
      </button>
    </div>
  );
}

export default DayNightSwitch;
