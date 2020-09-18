import React from "react";
import "./BookmarkHistory.scss";
import { BookmarksContext } from "./index";
import { toMinutes } from "../../utils/convertTime";

function ButtonGroup(props) {
  const {
    selected,
    setActiveBookmark,
    bookmark,
    setBookmarks,
    bookmarks,
  } = props;
  const onBookmarkClick = (e) => {
    if (selected) {
      setActiveBookmark(-1);
    } else {
      setActiveBookmark(bookmark.id);
    }
  };

  const removeBookmark = () => {
    if (selected) setActiveBookmark(-1);
    setBookmarks(bookmarks.filter((bkmrk) => bkmrk.id !== bookmark.id));
  };

  return (
    <div
      className={`history-button-group ${
        selected ? "history-button-group--selected" : ""
      }`}
    >
      <button
        className="history-button-group___value"
        onClick={onBookmarkClick}
      >
        {props.children}
      </button>
      <button onClick={removeBookmark} className="history-button-group___clear">
        x
      </button>
    </div>
  );
}

function Title(props) {
  return <div className="history-title">{props.children}</div>;
}

function BookmarkHistory(props) {
  const { className } = props;
  const {
    bookmarks,
    setActiveBookmark,
    activeBookmark,
    setBookmarks,
  } = React.useContext(BookmarksContext);

  return (
    <div className={`bookmark-history ${className}`}>
      <Title>Bookmarks history</Title>
      <ul className="bookmark-history__list">
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} className="bookmark-history__list__row">
            <ButtonGroup
              selected={activeBookmark === bookmark.id}
              setActiveBookmark={setActiveBookmark}
              setBookmarks={setBookmarks}
              bookmark={bookmark}
              bookmarks={bookmarks}
            >
              {toMinutes(bookmark.time)}
            </ButtonGroup>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkHistory;
