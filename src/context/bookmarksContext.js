
import React from "react";

export const BookmarksContext = React.createContext({});

export const bookmarksActions = {
    toggleSource: (state, action) => {
      return {
        ...state,
        isSourcePlaying: !state.isSourcePlaying,
      };
    },
    setRewindValue: (state, action) => {
      return {
        ...state,
        rewindValue: action.payload,
      };
    },
    goForward: (state, action) => {
      return {
        ...state,
        forwardTrigger: state.forwardTrigger + 1,
      };
    },
    goBackward: (state, action) => {
      return {
        ...state,
        backwardTrigger: state.backwardTrigger + 1,
      };
    },
    addBookmark: (state, action) => {
      return {
        ...state,
        addBookmarkTrigger: state.addBookmarkTrigger + 1,
      };
    },
    setBookmarkOffset: (state, action) => {
      return {
        ...state,
        bookmarkOffset: action.payload,
      };
    },
    playBookmark: (state, action) => {
      return {
        ...state,
        playBookmarkTrigger: state.playBookmarkTrigger + 1,
        isSourcePlaying: true,
      };
    },
    setIsCameraActive: (state, action) => {
      return {
        ...state,
        isCameraActive: action.payload,
      };
    },
  };