import React from "react";
import { BookmarksContext } from "../../context/bookmarksContext";
import './BookmarksLoad.scss'

function getBookmarks() {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    return savedBookmarks || [];
  }

function BookmarksLoad(props){
    const {
        bookmarks,
        setBookmarks,
        activeBookmark,
        setActiveBookmark,
      } = React.useContext(BookmarksContext);

      const updateBookmarks = () => {
         const savedBookmarks = getBookmarks();
         setBookmarks(savedBookmarks)
      }

    return(<button className='bookmark-load-button' onClick={updateBookmarks}>Load last bookmarks</button>)
}

export default BookmarksLoad;