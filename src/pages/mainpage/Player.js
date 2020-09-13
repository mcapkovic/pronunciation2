import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function getVideoSource() {
  const urlParameters = new URL(document.location.href).searchParams;
  return urlParameters.get("url");
}

function Player(props) {
  return (
    // <div>
      <ReactPlayer height="calc(99% - 1px)" width="99%" url={getVideoSource()} controls/>
    // </div>
  );
}

export default Player;
