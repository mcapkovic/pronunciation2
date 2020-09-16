import React from "react";
import "./Controls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faMicrophone,
  faTimes,
  faBackward,
  faForward,
  faExpandAlt,
  faCompressAlt,
} from "@fortawesome/free-solid-svg-icons";

import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useGetKey } from "../../hooks/useGetKey";

function Button(props) {
  const { icon, ...buttonProps } = props;
  return (
    <button {...buttonProps} className="controls-button">
      {icon ? <FontAwesomeIcon icon={icon} /> : props.children}
    </button>
  );
}

function Input(props) {
  return <input {...props} className="controls-input" />;
}

function Label(props) {
  return <div className="controls-label">{props.children}</div>;
}

function LastPressedKey(props) {
  const lastPressedKey = useGetKey();
  const { maxLength } = props;
  return <span>{lastPressedKey.slice(0, maxLength)}</span>;
}

function Controls(props) {
  const {
    layout,
    setLayout,
    state: { isSourcePlaying, rewindValue },
    customDispatch: { toggleSource, setRewindValue, goForward, goBackward },
  } = props;
  return (
    <div>
      <div className="controls2">
        <div className="controls2__spacer" />
        <div className="controls2__bookmark controls2__box">
          <div className="controls2__bookmark__offset">
            <Input />
          </div>
          <div className="controls2__bookmark__add">
            <Button icon={faBookmark} />
          </div>
          <div className="controls2__bookmark__remove">
            <Button icon={faTimes} />
          </div>
          <Label>Bookmark</Label>
        </div>
        <div className="controls2__source controls2__box">
          <Button
            icon={isSourcePlaying ? faPause : faPlay}
            onClick={toggleSource}
          />

          <Label>Source</Label>
        </div>
        <div className="controls2__record controls2__box">
          <div className="controls2__record__mic">
            <Button icon={faMicrophone} />
          </div>
          <div className="controls2__record__play">
            <Button icon={faPlay} />
          </div>
          <Label>Record</Label>
        </div>

        <div className="controls2__rewind controls2__box">
          <div className="controls2__rewind__offset">
            <Input
              value={rewindValue}
              onChange={(e) => setRewindValue(e.target.value)}
            />
          </div>
          <div className="controls2__rewind__backward">
            <Button icon={faBackward} onClick={goBackward} />
          </div>
          <div className="controls2__rewind__forward">
            <Button icon={faForward} onClick={goForward} />
          </div>
          <Label>Rewind</Label>
        </div>

        <div className="controls2__utils controls2__box">
          <div className="controls2__utils__resize">
            <Button
              icon={layout === "row" ? faExpandAlt : faCompressAlt}
              onClick={() => setLayout(layout === "row" ? "column" : "row")}
            />
          </div>
          <div className="controls2__utils__key">
            <LastPressedKey maxLength={5} />
          </div>
          {/* <div className="controls2__utils __offset">
            <Input />
          </div> */}
          <Label>Utils</Label>
        </div>

        <div className="controls2__spacer" />
      </div>
      {/* 
      <br />
      <div className="controls">
        <div className="controls__bookmark">
          <div className="controls__bookmark__add">a</div>
          <div className="controls__bookmark__remove">b</div>
          <div className="controls__bookmark__offset">c</div>
        </div>
        <div className="controls__source">
          s <br /> ss
        </div>
        <div className="controls__record">d</div>
        <div className="controls__rewind">f</div>
      </div> */}
    </div>
  );
}

export default Controls;
