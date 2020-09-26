import React from "react";
import { BookmarksContext } from "../../context/bookmarksContext";
import "./BookmarksLoad.scss";
import { ITEM_BOOKMARKS } from "../../constants";

function getBookmarks() {
  const savedBookmarks = JSON.parse(localStorage.getItem(ITEM_BOOKMARKS));
  return savedBookmarks || [];
}

function BookmarksLoad(props) {
  const {
    bookmarks,
    setBookmarks,
    activeBookmark,
    setActiveBookmark,
  } = React.useContext(BookmarksContext);

  const updateBookmarks = () => {
    const savedBookmarks = getBookmarks();
    setBookmarks(savedBookmarks);
  };

  return (
    <button className="bookmark-load-button" onClick={updateBookmarks}>
      Load the last bookmarks
    </button>
  );
}

export default BookmarksLoad;
