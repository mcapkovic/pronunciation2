import React from "react";
import "./ShareLesson.scss";
import { BookmarksContext } from "./index";
import { URL_BOOKMARKS, URL_VIDEO } from "../../constants";

function ShareLesson(props) {
  const {
    bookmarks,
    setBookmarks,
    activeBookmark,
    setActiveBookmark,
  } = React.useContext(BookmarksContext);

  const onShareClick = () => {
    let bookmarksString = "";
    let csvContent = "";
    console.log(bookmarks);
    if (bookmarks.length > 0) {
      bookmarks.forEach((bookmark) => {
        bookmarksString = `${bookmarksString}${bookmark.time};`;
      });

      //   const bookmarksToSave= bookmarks.map(bookmark => [`"${bookmark.time}"`])

      //   console.log({bookmarksToSave})
      //   csvContent =
      //     "data:text/csv;charset=utf-8," +
      //     bookmarksToSave.map((e) => e.join(",")).join("\n");

      // bookmarksString= 'aaa'
    }
    console.log({ bookmarksString });

    //     var encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);

    if (bookmarksString) {
      const urlParameters = new URL(document.location.href).searchParams;
      const videoUrl = urlParameters.get(URL_VIDEO);

      document.location.search = `${URL_VIDEO}=${videoUrl}&${URL_BOOKMARKS}=${bookmarksString}`;
    }
  };

  const test = () => {
    const urlParameters = new URL(document.location.href).searchParams;
    const aaa = urlParameters.get(URL_BOOKMARKS);
    console.log(aaa);
  };

  return (
    <div>
      <button className="share-lesson-button" onClick={onShareClick}>
        Share lesson (alpha feature)
      </button>
      <button onClick={test}>test</button>
    </div>
  );
}

export default ShareLesson;
