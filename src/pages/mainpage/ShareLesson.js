import React from "react";
import "./ShareLesson.scss";
import { BookmarksContext } from "../../context/bookmarksContext";
import { URL_VIDEO } from "../../constants";
import { getBookmarksUrlSearch } from "../../utils/bookmarksUtils";

function ShareLesson(props) {
  const { bookmarks } = React.useContext(BookmarksContext);
  const boxRef = React.useRef();
  const [toastrToggle, setToastrToggle] = React.useState(null);

  const onShareClick = () => {
    const bookmarksUrlSearch = getBookmarksUrlSearch(bookmarks);
    const urlParameters = new URL(document.location.href).searchParams;
    const videoUrl = urlParameters.get(URL_VIDEO);

    boxRef.current.value = `${document.location.origin}?${URL_VIDEO}=${videoUrl}&${bookmarksUrlSearch}`;
    boxRef.current.select();
    document.execCommand("copy");
    setToastrToggle(!toastrToggle);
  };

  return (
    <div className="share-lesson">
      <button className="share-lesson__button" onClick={onShareClick}>
        Share the lesson (alpha feature)
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
