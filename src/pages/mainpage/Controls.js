import React from "react";
import "./Controls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faMicrophone,
  faBackward,
  faForward,
  faExpandAlt,
  faCompressAlt,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useGetKey } from "../../hooks/useGetKey";
import { BookmarksContext } from "../../context/bookmarksContext";
import Record from "./Recorder";
import useKeyDown from "../../hooks/useKeyDown";
import TooltipDescription from "../../components/TooltipDescription";
import { getTooltipText } from "../../utils/generalUtils";

function Button(props) {
  const { icon, tooltip, ...buttonProps } = props;
  return (
    <TooltipDescription className="controls-button" tooltip={tooltip}>
      <button {...buttonProps}>
        {icon ? <FontAwesomeIcon icon={icon} /> : props.children}
      </button>
    </TooltipDescription>
  );
}

// function Input(props) {
//   return <input {...props} className="controls-input" />;
// }

function Input(props) {
  const { tooltip, ...inputProps } = props;

  return (
    <TooltipDescription tooltip={tooltip} className="controls-input">
      <input {...inputProps} className="controls-input__input" />
    </TooltipDescription>
  );
}

function Label(props) {
  return <div className="controls-label">{props.children}</div>;
}

function LastPressedKey(props) {
  const lastPressedKey = useGetKey();
  const { maxLength } = props;
  return <span>{lastPressedKey.slice(0, maxLength)}</span>;
}

function checkFocus() {
  // const element = document.querySelector(".controls2");
  const element = checkFocus.elementRef;
  // if (document.activeElement === document.getElementsByTagName("iframe")[0]) {
  if (document.activeElement.id === "widget2") {
    element.classList.add("controls2--disabled");
    // element.focus();
  } else if (element.classList.length > 1) {
    element.classList.remove("controls2--disabled");
  }
}

const actionDetails = {
  recordPlay: { text: "play/stop recorded data", shortcut: "s" },
  recordingToggle: { text: "start/stop recording", shortcut: "a" },
  videoToggle: { text: "play/pause source video", shortcut: "d" },
  addBookmark: { text: "add a bookmark", shortcut: "r" },
  bookmarkPlay: { text: "play a bookmark", shortcut: "f" },
  rewindBack: { text: "rewind backward", shortcut: "arrow left" },
  rewindForward: { text: "rewind forward", shortcut: "arrow right" },
  bookmarkOffset: {
    text: "bookmark time offset in seconds",
    shortcut: "",
  },
  rewindOffset: { text: "rewind value in seconds", shortcut: "" },
};

function Controls(props) {
  const {
    layout,
    setLayout,
    state: { isSourcePlaying, rewindValue, bookmarkOffset },
    customDispatch: {
      toggleSource,
      setRewindValue,
      goForward,
      goBackward,
      addBookmark,
      setBookmarkOffset,
      playBookmark,
    },
  } = props;

  const { activeBookmark } = React.useContext(BookmarksContext);

  const [isRecording, setIsRecording] = React.useState(false);
  const [isRecordPlaying, setIsRecordPlaying] = React.useState(false);

  const toggleRecording = () => {
    if (isSourcePlaying) toggleSource();
    if (isRecording) setIsRecordPlaying(true);
    if (!isRecording) setIsRecordPlaying(false);
    setIsRecording(!isRecording);
  };
  const toggleRecordPlay = () => {
    if (isSourcePlaying) toggleSource();
    setIsRecording(false);
    setIsRecordPlaying(!isRecordPlaying);
  };

  useKeyDown("ArrowRight", () => {
    goForward();
  });

  useKeyDown("ArrowLeft", () => {
    goBackward();
  });

  useKeyDown("d", () => {
    toggleSource();
  });

  useKeyDown("r", () => {
    addBookmark();
  });

  useKeyDown("f", () => {
    playBookmark();
  });

  useKeyDown(
    "a",
    () => {
      toggleRecording();
    },
    [isRecording, isSourcePlaying]
  );

  useKeyDown(
    "s",
    () => {
      toggleRecordPlay();
    },
    [isRecordPlaying, isSourcePlaying]
  );

  const controlsRef = React.useRef();

  React.useEffect(() => {
    checkFocus.elementRef = controlsRef.current;
    const id = window.setInterval(checkFocus, 500);
    return () => window.clearInterval(id);
  }, [controlsRef.current]);

  return (
    <div>
      <div ref={controlsRef} className="controls2" tabIndex={0}>
        <div className="controls2__spacer" />

        <div className="controls2__record controls2__box">
          <div className="controls2__record__sound">
            <Record
              isRecording={isRecording}
              setIsRecordPlaying={setIsRecordPlaying}
              isRecordPlaying={isRecordPlaying}
            />
          </div>
          <div className="controls2__record__mic">
            <Button
              onClick={toggleRecording}
              icon={isRecording ? faStop : faMicrophone}
              tooltip={getTooltipText(actionDetails.recordingToggle)}
            />
          </div>
          <div className="controls2__record__play">
            <Button
              onClick={toggleRecordPlay}
              icon={isRecordPlaying ? faStop : faPlay}
              tooltip={getTooltipText(actionDetails.recordPlay)}
            />
          </div>
          <Label>Record</Label>
        </div>
        <div className="controls2__source controls2__box">
          <Button
            icon={isSourcePlaying ? faPause : faPlay}
            onClick={toggleSource}
            tooltip={getTooltipText(actionDetails.videoToggle)}
          />
          <Label>Video</Label>
        </div>

        <div className="controls2__bookmark controls2__box">
          <div className="controls2__bookmark__offset">
            <Input
              type="number"
              value={bookmarkOffset}
              onChange={(e) => setBookmarkOffset(e.target.value)}
              tooltip={actionDetails.bookmarkOffset.text}
            />
          </div>
          <div className="controls2__bookmark__add">
            <Button
              onClick={addBookmark}
              icon={activeBookmark === -1 ? faBookmark : faBookmarkSolid}
              tooltip={getTooltipText(actionDetails.addBookmark)}
            />
          </div>
          <div className="controls2__bookmark__toggle">
            <Button
              onClick={playBookmark}
              icon={faPlay}
              tooltip={getTooltipText(actionDetails.bookmarkPlay)}
            />
          </div>
          <Label>Bookmark</Label>
        </div>

        <div className="controls2__rewind controls2__box">
          <div className="controls2__rewind__offset">
            <Input
              type="number"
              value={rewindValue}
              onChange={(e) => setRewindValue(e.target.value)}
              tooltip={actionDetails.rewindOffset.text}
            />
          </div>
          <div className="controls2__rewind__backward">
            <Button
              icon={faBackward}
              onClick={goBackward}
              tooltip={getTooltipText(actionDetails.rewindBack)}
            />
          </div>
          <div className="controls2__rewind__forward">
            <Button
              icon={faForward}
              onClick={goForward}
              tooltip={getTooltipText(actionDetails.rewindForward)}
            />
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
