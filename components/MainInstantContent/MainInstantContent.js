"use client";
import CodeEditor from "@components/Editor/CodeEditor";
import { useParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { useSocket } from "@components/Context/SocketProvider";
import VideoStreams from "@components/VideoStreams/VideoStreams";

const MainInstantContent = ({ username, roomId }) => {
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    const switchVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    };
    switchVideo();
  }, []);

  const params = useParams();
  console.log(params);
  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "70%" }}>
        <CodeEditor
          sessionId={params.sessionId}
          username={username}
          roomId={roomId}
        />
      </div>
      <div style={{ display: "flex", width: "30%" }}>
        <VideoStreams myStream={myStream} />
      </div>
    </div>
  );
};

export default MainInstantContent;
