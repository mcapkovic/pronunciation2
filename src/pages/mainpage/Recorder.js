import React from "react";
import "./Recorder.scss";
import { ReactMic } from "react-mic";
import ReactAudioPlayer from "react-audio-player";

function Recorder(props) {
  const { isRecording, setIsRecordPlaying, isRecordPlaying } = props;
  const [blobURL, setBlobURL] = React.useState(null);

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);
  };

  const onEnded = () => {
    setIsRecordPlaying(false);
  };

  return (
    <div className="recorder">
      <ReactMic
        className="recorder__mic"
        style={{ height: "10px" }}
        record={isRecording}
        onStop={onStop}
        // onData={onData}
        strokeColor="gray"
        backgroundColor="#ffffff"
        visualSetting="frequencyBars"
      />

      <ReactAudioPlayer
        //   controls
        src={isRecordPlaying ? blobURL : ""}
        autoPlay
        // onPlay={(e) => console.log("onPlay", e)}
        // onEnded={(e) => console.log("onEnded", e)}
        onEnded={onEnded}
      />
    </div>
  );
}

export default Recorder;
