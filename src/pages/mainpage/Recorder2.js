import React from "react";
import ReactAudioPlayer from "react-audio-player";
import AudioRecorder from "audio-recorder-polyfill";
import RecordingCount from "./RecordingCount";

if (!window.MediaRecorder) window.MediaRecorder = AudioRecorder;

function Recorder2(props) {
  const { isRecording, setIsRecordPlaying, isRecordPlaying } = props;
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [audio, setAudio] = React.useState("");
  const [stream, setStream] = React.useState(undefined);
  const [error, setError] = React.useState(null);

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((newStream) => {
        const newMediaRecorder = new MediaRecorder(newStream);

        newMediaRecorder.addEventListener("dataavailable", (e) => {
          setAudio(URL.createObjectURL(e.data));
        });
        newMediaRecorder.start();

        setMediaRecorder(newMediaRecorder);
        setStream(newStream);
      })
      .catch(function (err) {
        setError(err);
        console.warn("The following getUserMedia error occured: " + err);
      });
  };

  const stop = () => {
    try {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (err) {}
  };

  React.useEffect(() => {
    if (isRecording) {
      startListening();
    }
    if (!isRecording) {
      stop();
    }
  }, [isRecording]);

  const isRecordingX =
    mediaRecorder && mediaRecorder.state === "recording" ? true : false;

  return (
    <div style={{ backgroundColor: "red"}}>
      <ReactAudioPlayer
        src={isRecordPlaying && audio ? audio : ""}
        autoPlay
        onEnded={() =>  setIsRecordPlaying(false)}
      />

      {/* <br />
      <button disabled={isRecordingX} onClick={record}>
        s
      </button>
      <button disabled={!isRecordingX} onClick={stop}>
        c
      </button> */}
      <div>
        {isRecordingX && (
          <div>
            status:
            <RecordingCount />
          </div>
        )}
      </div>
    </div>
  );
}

export default Recorder2;
