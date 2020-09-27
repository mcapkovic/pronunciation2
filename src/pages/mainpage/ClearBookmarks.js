import React from "react";
import Button from "../../components/Button";
import "./ClearBookmarks.scss";
import { BookmarksContext } from "../../context/bookmarksContext";

function ClearBookmarks(props) {
  const { setBookmarks } = React.useContext(BookmarksContext);
  return (
    <div className="clear-bookmarks">
      <Button onClick={() => setBookmarks([])}>Remove all bookmarks</Button>
    </div>
  );
}

export default ClearBookmarks;
