import React from "react";
import "./Camera.scss";
import { useUserMedia } from "../hooks/useUserMedia";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user" },
};

function Camera(props) {
  const { className } = props;
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const videoRef = React.useRef();
  const [zoom, setZoom] = React.useState(1);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }
  return (
    <div className={"camera " + className}>
      <video
        className="camera__video"
        style={{ transform: `scaleX(-${zoom}) scaleY(${zoom})` }}
        ref={videoRef}
        autoPlay
      />
      {mediaStream && (
        <input
          className="camera__zoom"
          type="range"
          min={1}
          max={3}
          value={zoom}
          step={0.1}
          onChange={(e) => setZoom(e.target.value)}
          className="camera__zoom"
        />
      )}
    </div>
  );
}

export default Camera;
