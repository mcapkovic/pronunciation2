import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function getVideoSource() {
  const urlParameters = new URL(document.location.href).searchParams;
  return urlParameters.get("url");
}

function Player(props) {
  const {
    state: { isSourcePlaying, rewindValue, forwardTrigger, backwardTrigger },
    customDispatch: { toggleSource },
  } = props;

  const player = React.useRef();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const playerState = React.useRef();

  useEffect(() => {
    console.log("eeee", player.current.getCurrentTime());

    const current = player.current.getCurrentTime();
    player.current.seekTo(Number(current) + Number(rewindValue));
  }, [forwardTrigger]);

  useEffect(() => {
    console.log("eeee", player.current.getCurrentTime());

    const current = player.current.getCurrentTime();
    player.current.seekTo(Number(current) - Number(rewindValue));
  }, [backwardTrigger]);

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

  const [play, setPlay] = React.useState(false);

  return (
    // <div>
      <ReactPlayer
        ref={player}
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
