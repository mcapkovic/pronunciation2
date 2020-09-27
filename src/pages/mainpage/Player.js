import React from "react";
import ReactPlayer from "react-player";
import { BookmarksContext } from "../../context/bookmarksContext";
import createUUID from "../../utils/createUUID";
import { ITEM_BOOKMARKS, URL_VIDEO } from "../../constants";

function getVideoSource() {
  const urlParameters = new URL(document.location.href).searchParams;
  return urlParameters.get(URL_VIDEO);
}

function Player(props) {
  const {
    bookmarks,
    setBookmarks,
    activeBookmark,
    setActiveBookmark,
  } = React.useContext(BookmarksContext);

  const {
    state: {
      isSourcePlaying,
      rewindValue,
      forwardTrigger,
      backwardTrigger,
      bookmarkOffset,
      addBookmarkTrigger,
      playBookmarkTrigger,
    },
    customDispatch: { toggleSource },
  } = props;
  const player = React.useRef();

  // play bookmark
  React.useEffect(() => {
    if (bookmarks.length === 0 || playBookmarkTrigger === 0) return;

    if (activeBookmark === -1) {
      player.current.seekTo(bookmarks[0].time);
      setActiveBookmark(bookmarks[0].id);
    } else {
      const index = bookmarks.findIndex(
        (bookmark) => bookmark.id === activeBookmark
      );
      if (index < 0) return;
      player.current.seekTo(bookmarks[index].time);
    }
  }, [playBookmarkTrigger]);

  // add bookmark
  React.useEffect(() => {
    if (addBookmarkTrigger === 0) return;
    const current = player.current.getCurrentTime();
    const newTime =
      Math.round((Number(current) + Number(bookmarkOffset)) * 1000) / 1000;
    const newBookmark = {
      id: createUUID(),
      time: newTime >= 0 ? newTime : 0,
    };
    const newBookmarks = [newBookmark, ...bookmarks];
    setBookmarks(newBookmarks);
    setActiveBookmark(newBookmark.id);
    localStorage.setItem(ITEM_BOOKMARKS, JSON.stringify(newBookmarks));
  }, [addBookmarkTrigger]);

  // rewind forward
  React.useEffect(() => {
    if (forwardTrigger === 0) return;
    const current = player.current.getCurrentTime();
    player.current.seekTo(Number(current) + Number(rewindValue));
  }, [forwardTrigger]);

  // rewin backward
  React.useEffect(() => {
    if (backwardTrigger === 0) return;

    const current = player.current.getCurrentTime();
    player.current.seekTo(Number(current) - Number(rewindValue));
  }, [backwardTrigger]);

  const handlePlay = (e) => {
    if (!isSourcePlaying) toggleSource();
  };

  const onPause = (e) => {
    if (isSourcePlaying) toggleSource();
  };

  return (
    <ReactPlayer
      ref={player}
      height="99%"
      width="99%"
      url={getVideoSource()}
      controls
      playing={isSourcePlaying}
      onPause={onPause}
      onPlay={handlePlay}
    />
  );
}

export default Player;
