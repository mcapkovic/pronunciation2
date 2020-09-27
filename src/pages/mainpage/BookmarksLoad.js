import React from "react";
import { BookmarksContext } from "../../context/bookmarksContext";
import "./BookmarksLoad.scss";
import { ITEM_BOOKMARKS } from "../../constants";
import Button from "../../components/Button";

function getBookmarks() {
  const savedBookmarks = JSON.parse(localStorage.getItem(ITEM_BOOKMARKS));
  return savedBookmarks || [];
}

function BookmarksLoad(props) {
  const { setBookmarks } = React.useContext(BookmarksContext);

  const updateBookmarks = () => {
    const savedBookmarks = getBookmarks();
    setBookmarks(savedBookmarks);
  };

  return (
    <div>
      <Button onClick={updateBookmarks}>Load the last bookmarks</Button>
    </div>
  );
}

export default BookmarksLoad;
