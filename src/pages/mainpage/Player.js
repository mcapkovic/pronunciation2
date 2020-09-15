import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function getVideoSource() {
  const urlParameters = new URL(document.location.href).searchParams;
  return urlParameters.get("url");
}

function Player(props) {
  const {
    state: { isSourcePlaying },
    customDispatch: { toggleSource },
  } = props;

  const playerState = React.useRef();

  const handleProgress = (e) => {
    console.log(e);

    console.log("isSourcePlaying", isSourcePlaying);
  };

  const handlePlay = (e) => {
    if (!isSourcePlaying) toggleSource();
  };

  const onPause = (e) => {
    if (isSourcePlaying) toggleSource();
  };

  return (
    // <div>
    <ReactPlayer
      height="99%"
      width="99%"
      url={getVideoSource()}
      controls
      playing={isSourcePlaying}
      //   onProgress={handleProgress}
      onPause={onPause}
      onPlay={handlePlay}
    />
    // </div>
  );
}

export default Player;
