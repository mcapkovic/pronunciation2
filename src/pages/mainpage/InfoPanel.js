import React from "react";
import "./InfoPanel.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayNightSwitch from "../../components/DayNightSwitch";
import BookmarksLoad from './BookmarksLoad';
import ShareLesson from './ShareLesson';
import { URL_VIDEO } from "../../constants";

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
  return urlParameters.get(URL_VIDEO);
}

function VideoSource(props) {
  const [value, setValue] = React.useState(getVideoSource);

  const addUrl = React.useCallback(() => {
    document.location.search = value
      ? URL_VIDEO + "=" + value
      : URL_VIDEO + "=https://youtu.be/ZTgYjGXFAkw";
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
        <FontAwesomeIcon icon={faArrowRight} />
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

      <div className="info-panel__section">
        <Title>Utils</Title>
        < BookmarksLoad />
        <ShareLesson/>
      </div>

      <div className="info-panel__section">
        <Title>Keyboard shortcuts</Title>
        <div>r - add a bookmark</div>
        <div>f - play a bookmark</div>
        <div>d - play/pause video</div>
        <div>a - start/stop recording</div>
        <div>s - play/stop record</div>
        <div>Arrow left - rewind backward</div>
        <div>Arrow right - rewind forward</div>
      </div>

      <div className="info-panel__section">
        <Title>Day Night Switch</Title>
        <DayNightSwitch />
      </div>
    </div>
  );
}

export default InfoPanel;
