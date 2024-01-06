"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSocket } from "@components/Context/SocketProvider";

const CodeEditor = ({ username, roomId, sessionId }) => {
  const [codeData, setCodeData] = useState("");
  const socket = useSocket();
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // const doc = new Y.Doc();
    // const provider = new WebrtcProvider(sessionId, doc);
    // const type = doc.getText("monaco");
    // const binding = new MonacoBinding(
    //   type,
    //   editorRef.current.getModel(),
    //   new Set([editorRef.current]),
    //   provider.awareness
    // );
    // console.log(doc);
    // console.log("awareness is ", provider.awareness);
  };

  const handleCodeChange = useCallback((data) => {
    setCodeData(data.code);
  }, []);

  useEffect(() => {
    socket.on("user:code", handleCodeChange);

    return () => {
      socket.off("user:code", handleCodeChange);
    };
  }, [socket, handleCodeChange]);

  const handleEditorOnChange = () => {
    socket.emit("user:code", {
      username: username,
      code: editorRef.current.getValue(),
      roomId: roomId,
    });
  };

  const editorRef = useRef(null);
  return (
    <div style={{ margin: "20px", display: "flex", width: "100%" }}>
      <Editor
        height="85vh"
        width="100%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorOnChange}
        value={codeData}
        // defaultLanguage="cpp"
      />
    </div>
  );
};

export default CodeEditor;
