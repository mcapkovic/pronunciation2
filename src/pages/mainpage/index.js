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
  });

  return (
    <div className={`controlled-player ${className}`}>
      <div className={`controlled-player__source`}>
        <Player state={state} customDispatch={customDispatch} />
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
      <div className="browser-warning">
        WARNING. Voice recording not supported in Safari.
      </div>
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
      </div>
    </BookmarksContext.Provider>
  );
}

export default MainPage;
