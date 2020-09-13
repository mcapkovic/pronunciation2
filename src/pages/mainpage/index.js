import React from "react";
import { useMediaQuery } from "beautiful-react-hooks";
import "./index.scss";
import Controls from "./Controls";
import BookmarkHistory from "./BookmarkHistory";
import InfoPanel from "./InfoPanel";
import { useCustomReducer } from "../../hooks/useCustomReducer";

const bookmarks = [
  { id: 1, time: 305 },
  { id: 2, time: 203 },
  { id: 3, time: 603 },
  { id: 4, time: 603 },
  { id: 5, time: 603 },
  { id: 6, time: 603 },
  { id: 7, time: 603 },
  { id: 8, time: 603 },
  { id: 9, time: 603 },
  { id: 10, time: 603 },
  { id: 11, time: 603 },
  { id: 12, time: 603 },
  { id: 13, time: 603 },
  { id: 14, time: 603 },
  { id: 15, time: 603 },
  { id: 16, time: 603 },
  { id: 17, time: 603 },
  { id: 18, time: 603 },
  { id: 19, time: 603 },
  { id: 20, time: 603 },
  { id: 21, time: 603 },
  { id: 22, time: 603 },
  { id: 23, time: 603 },
  { id: 24, time: 603 },
  { id: 25, time: 603 },
  { id: 26, time: 603 },
  { id: 27, time: 603 },
  { id: 28, time: 603 },
  { id: 29, time: 603 },
  { id: 30, time: 603 },
  { id: 31, time: 603 },
  { id: 32, time: 603 },
];

function ControlledPlayer(props) {
  const { layout, setLayoutButton, className } = props;
  return (
    <div className={`controlled-player ${className}`}>
      <div className={`controlled-player__source`}></div>
      <Controls layout={layout} setLayout={setLayoutButton} />
    </div>
  );
}

const actions = {
  addOne: (state, action) => {
    return { ...state, test: state.test + 1 };
  },
  removeOne: (state, action) => {
    return { ...state, test: state.test - 1 };
  },
};

function MainPage() {
  const [layoutButton, setLayoutButton] = React.useState("row");
  const forceColumn = useMediaQuery("(max-width: 750px)");
  const layout = forceColumn ? "column" : layoutButton;
  const [activeBookmark, setActiveBookmark] = React.useState(-1);
  const [state, { addOne, removeOne }] = useCustomReducer(actions, { test: 0 });

  return (
    <div className={`page page--${layout}`}>
      <button onClick={addOne}>ddddd</button>
      <button onClick={removeOne}>aaaa</button>

      <div className={`page__video-row`}>
        <ControlledPlayer
          className={`page__video-row__video`}
          layout={layout}
          setLayoutButton={setLayoutButton}
        />
        {layout === "row" && (
          <BookmarkHistory
            history={bookmarks}
            current={activeBookmark}
            setActiveBookmark={setActiveBookmark}
            className={`page__video-row__history`}
          />
        )}
      </div>

      <div className="page__details-row">
        {layout !== "row" && (
          <BookmarkHistory
            history={bookmarks}
            current={activeBookmark}
            setActiveBookmark={setActiveBookmark}
            className={`page__details-row__history`}
          />
        )}
        <InfoPanel className="page__details-row__info" />
      </div>
      <div className="page__bottom-spacer" />
    </div>
  );
}

export default MainPage;