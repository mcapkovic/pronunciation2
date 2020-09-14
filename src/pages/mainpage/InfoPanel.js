import React from "react";
import "./InfoPanel.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayNightSwitch from "./DayNightSwitch";

function Title(props) {
  const { modifier } = props;
  return (
    <div className={`info-title ${modifier ? "info-title--" + modifier : ""}`}>
      {props.children}
    </div>
  );
}

function getVideoSource() {
  const urlParameters = new URL(document.location.href).searchParams;
  return urlParameters.get("url");
}

function VideoSource(props) {
  const [value, setValue] = React.useState(getVideoSource);

  const addUrl = React.useCallback(() => {
    document.location.search = value
      ? "url=" + value
      : "url=https://youtu.be/ZTgYjGXFAkw";
  }, [value]);

  const editValue = React.useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  return (
    <div className="video-source">
      <input
        className="video-source__input"
        value={value}
        onChange={editValue}
        placeholder="https://youtu.be/ZTgYjGXFAkw"
      />
      <button className="video-source__button" onClick={addUrl}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}


function InfoPanel(props) {
  const { className } = props;
  return (
    <div className={`info-panel ${className}`}>
      <Title modifier="source">Source address</Title>
      <VideoSource />
      <br />
      <Title>Keyboard shortcuts</Title>
      <ul>
        <li>a - something</li>

        <li>s - something</li>
        <li>d - something</li>
      </ul>
      <br />
      <Title>Day Night Switch</Title>
      <DayNightSwitch />
    </div>
  );
}

export default InfoPanel;