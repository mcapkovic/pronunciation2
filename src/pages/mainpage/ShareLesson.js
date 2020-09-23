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

  const { value, theme } = props;
  const boxRef = React.useRef();
  const [toastrToggle, setToastrToggle] = React.useState(null);

  const onShareClick = () => {
    let bookmarksString = "";
    let csvContent = "";
    console.log(bookmarks);
    if (bookmarks.length > 0) {
      bookmarks.forEach((bookmark) => {
        bookmarksString = `${bookmarksString}${bookmark.time};`;
      });
    }

    const urlParameters = new URL(document.location.href).searchParams;
    const videoUrl = urlParameters.get(URL_VIDEO);

    boxRef.current.value = `${document.location.origin}?${URL_VIDEO}=${videoUrl}&${URL_BOOKMARKS}=${bookmarksString}`;
    boxRef.current.select();
    document.execCommand("copy");
    setToastrToggle(!toastrToggle);
  };

  return (
    <div className="share-lesson">
      <button className="share-lesson__button" onClick={onShareClick}>
        Share lesson (alpha feature)
      </button>

      <textarea className="share-lesson__text-area" ref={boxRef} />

      {toastrToggle !== null && (
        <div
          className={`share-lesson__toastr ${
            toastrToggle
              ? "share-lesson__toastr--one"
              : "share-lesson__toastr--two"
          }`}
        >
          Copied to the clipboard!
        </div>
      )}
    </div>
  );
}

export default ShareLesson;
