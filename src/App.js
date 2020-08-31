import React from "react";
import logo from "./logo.svg";
import { useMediaQuery } from "beautiful-react-hooks";
import "./App.scss";
import Controls from "./Controls";
import BookmarkHistory from "./BookmarkHistory";

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
function MainSection() {
  const [layoutButton, setLayoutButton] = React.useState("row");
  const forceColumn = useMediaQuery("(max-width: 750px)");
  const layout = forceColumn ? "column" : layoutButton;

  return (
    <div className={`practice practice--${layout}`}>
      <div className="practice__video">
        <div
          className={`practice__video__source practice__video__source--${layout}`}
        ></div>
        <Controls layout={layout} setLayout={setLayoutButton} />
      </div>
      <BookmarkHistory
        history={bookmarks}
        current={1}
        className={`practice__history practice__history--${layout}`}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <MainSection />
    </div>
  );
}

export default App;