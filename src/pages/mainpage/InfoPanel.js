import React from "react";
import "./InfoPanel.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayNightSwitch from "../../components/DayNightSwitch";

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
      <div className="info-panel__section">
        <Title modifier="source">Video url</Title>
        <VideoSource />
      </div>
      {/* <br /> */}
      {/* <Title>Utils</Title>
      <button >Load previous bookmarks</button>
      <br />
      <br /> */}
      <div className="info-panel__section">
        <Title>Keyboard shortcuts</Title>
        <div>a - something</div>
        <div>s - something</div>
        <div>d - something</div>
        {/* <ul>
          <li>a - something</li>

          <li>s - something</li>
          <li>d - something</li>
        </ul> */}
      </div>

      <div className="info-panel__section">
        <Title>Day Night Switch</Title>
        <DayNightSwitch />
      </div>
    </div>
  );
}

export default InfoPanel;
