import React from "react";
import { useMediaQuery } from "beautiful-react-hooks";
import "./index.scss";
import Controls from "./Controls";
import BookmarkHistory from "./BookmarkHistory";
import InfoPanel from "./InfoPanel";
import { useCustomReducer } from "../../hooks/useCustomReducer";
import Player from "./Player";

const initialBookmarks = [
  { id: 1, time: 305 },
  { id: 2, time: 203 },

];

const actions = {
  toggleSource: (state, action) => {
    return {
      ...state,
      isSourcePlaying: !state.isSourcePlaying,
    };
  },
  setRewindValue: (state, action) => {
    return {
      ...state,
      rewindValue: action.payload,
    };
  },
  goForward: (state, action) => {
    return {
      ...state,
      forwardTrigger: state.forwardTrigger + 1,
    };
  },
  goBackward: (state, action) => {
    return {
      ...state,
      backwardTrigger: state.backwardTrigger + 1,
    };
  },
  addBookmark: (state, action) => {
    return {
      ...state,
      addBookmarkTrigger: state.addBookmarkTrigger + 1,
    };
  },
  setBookmarkOffset: (state, action) => {
    return {
      ...state,
      bookmarkOffset: action.payload,
    };
  },
};

function ControlledPlayer(props) {
  const { layout, setLayoutButton, className } = props;
  const [state, customDispatch] = useCustomReducer(actions, {
    isSourcePlaying: false,
    rewindValue: 1,
    forwardTrigger: 0,
    backwardTrigger: 0,
    addBookmarkTrigger: 0,
    bookmarkOffset: -1,
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

export const BookmarksContext = React.createContext({});

function MainPage() {
  const [layoutButton, setLayoutButton] = React.useState("row");
  const forceColumn = useMediaQuery("(max-width: 750px)");
  const layout = forceColumn ? "column" : layoutButton;

  const [activeBookmark, setActiveBookmark] = React.useState(-1);
  const [bookmarks, setBookmarks] = React.useState(initialBookmarks);

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
      </div>
    </BookmarksContext.Provider>
  );
}

export default MainPage;
