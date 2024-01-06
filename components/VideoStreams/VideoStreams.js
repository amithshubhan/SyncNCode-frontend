import React from "react";
import ReactPlayer from "react-player";

const VideoStreams = ({ myStream }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {myStream && (
          <ReactPlayer playing muted height="200px" url={myStream} />
        )}
      </div>
    </>
  );
};

export default VideoStreams;
