import React from "react";
import { useMediaQuery } from "beautiful-react-hooks";
import "./index.scss";
import Controls from "./Controls";
import BookmarkHistory from "./BookmarkHistory";
import InfoPanel from "./InfoPanel";
import { useCustomReducer } from "../../hooks/useCustomReducer";
import Player from "./Player";
import { getBookmarksFromUrl } from "../../utils/bookmarksUtils";
import {
  BookmarksContext,
  bookmarksActions,
} from "../../context/bookmarksContext";
import Camera from "../../components/Camera";

function ControlledPlayer(props) {
  const { layout, setLayoutButton, className } = props;
  const [state, customDispatch] = useCustomReducer(bookmarksActions, {
    isSourcePlaying: false,
    rewindValue: 1,
    forwardTrigger: 0,
    backwardTrigger: 0,
    addBookmarkTrigger: 0,
    bookmarkOffset: -1,
    playBookmarkTrigger: 0,
    isCameraActive: false,
  });

  return (
    <div className={`controlled-player ${className}`}>
      <div className={`controlled-player__source`}>
        <Player state={state} customDispatch={customDispatch} />
        {state.isCameraActive && (
          <Camera className="controlled-player__source__camera" />
        )}
      </div>
      <Controls
        state={state}
        customDispatch={customDispatch}
        layout={layout}
        setLayout={setLayoutButton}
      />
    </div>
  );
}

function MainPage() {
  const [layoutButton, setLayoutButton] = React.useState("row");
  const forceColumn = useMediaQuery("(max-width: 750px)");
  const layout = forceColumn ? "column" : layoutButton;

  const [activeBookmark, setActiveBookmark] = React.useState(-1);
  const [bookmarks, setBookmarks] = React.useState(() => getBookmarksFromUrl());

  const provider = React.useMemo(() => {
    return { bookmarks, setBookmarks, activeBookmark, setActiveBookmark };
  }, [bookmarks, setBookmarks, activeBookmark, setActiveBookmark]);

  return (
    <BookmarksContext.Provider value={provider}>
      <div className={`page page--${layout}`}>
        <div className={`page__video-row`}>
          <ControlledPlayer
            className={`page__video-row__video`}
            layout={layout}
            setLayoutButton={setLayoutButton}
          />
          {layout === "row" && (
            <BookmarkHistory className={`page__video-row__history`} />
          )}
        </div>

        <div className="page__details-row">
          {layout !== "row" && (
            <BookmarkHistory className={`page__details-row__history`} />
          )}
          <InfoPanel className="page__details-row__info" />
        </div>
        <div className="page__bottom-spacer" />

        <div className="page__footer">
          <div className="page__footer__text">
            Contact mcapkovic+pronunciation@gmail.com App development and
            maintenance take a great amount of time. If you like the project, you can support it by clicking on the button below.
          </div>
          <div className="page__footer__ko-fi">
            <a
              href="https://ko-fi.com/T6T22IEIO"
              target="_blank"
              style={{ margin: "20px" }}
            >
              <img
                height="36"
                style={{ border: "0px", height: "36px" }}
                src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
                border="0"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>
          </div>
        </div>
      </div>
    </BookmarksContext.Provider>
  );
}

export default MainPage;
