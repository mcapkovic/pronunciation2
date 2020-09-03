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
];

function DayNightSwitch() {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = 0;
  }, []);

  const onChange = (e) => {
    // console.log(e.target.value)
    colorVariables.forEach((variable) => {
      document.documentElement.style.setProperty(
        variable.name,
        convertRangeValue(inputRef.current.value, variable.min, variable.max) +
          "%"
      );
    });
  };

  const onDayClick = () => {
    inputRef.current.value = 0;
    onChange();
  };

  const onNightClick = () => {
    inputRef.current.value = 100;
    onChange();
  };

  // return <button onClick={onClick}>asasda</button>
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
