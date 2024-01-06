"use client";
import Header from "@components/InstantHeader/Header";
import MainInstantContent from "@components/MainInstantContent/MainInstantContent";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useSocket } from "@components/Context/SocketProvider";

const SimpleDialog = ({
  setOpen,
  onClose,
  selectedValue,
  open,
  userName,
  setUserName,
  isLoggedIn,
  setIsLoggedIn,
  password,
  roomId,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [helperText, setHelperText] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [tempName, setTempName] = useState("");
  const socket = useSocket();

  const handleSubmit = (e) => {
    if (currentPass === password || isLoggedIn) {
      setUserName(tempName);
      Cookies.set(roomId, "true");

      socket.emit("room:join", { username: tempName, roomId: roomId });
      setIsLoggedIn(true);
      handleClose();
    } else {
      setHelperText("Password Incorrect");
    }
  };

  const handleRoomJoin = useCallback((data) => {
    console.log("roomer is ", data.roomId);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleRoomJoin);
    return () => {
      socket.off("room:join", handleRoomJoin);
    };
  }, [socket, handleRoomJoin]);

  return (
    <Dialog
      className="glassmorphism"
      PaperProps={{
        sx: {
          backgroundColor: "#002945",
          opacity: "0.8",
          border: "1px solid #00406C",
        },
      }}
      onClose={handleClose}
      open={open}
    >
      <div
        style={{
          display: "flex",
          margin: "10px",
          padding: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "5px",
            padding: "5px",
          }}
        >
          <h1
            className="text-primary "
            style={{
              fontSize: "15px",
              fontWeight: 600,
              margin: "5px 5px",
              display: "flex",
              minWidth: "180px",
              justifyContent: "flex-start",
              padding: "5px 10px",
            }}
          >
            Enter Display Name
          </h1>
          <TextField
            label="Username"
            color="primary"
            focused
            sx={{ input: { color: "white" } }}
            size="small"
            onChange={(e) => setTempName(e.target.value)}
            variant="outlined"
          />
        </div>
        {!isLoggedIn ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "5px",
              padding: "5px",
            }}
          >
            <h1
              className="text-primary "
              style={{
                fontSize: "15px",
                fontWeight: 600,
                margin: "5px 5px",
                display: "flex",
                minWidth: "180px",
                justifyContent: "flex-start",
                padding: "5px 10px",
              }}
            >
              Enter Password
            </h1>
            <TextField
              label="Password"
              color="primary"
              focused
              sx={{ input: { color: "white" } }}
              size="small"
              onChange={(e) => setCurrentPass(e.target.value)}
              variant="outlined"
              helperText={helperText}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <DialogActions>
        <Button
          variant="outlined"
          className="text-primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          className="text-primary"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const page = () => {
  const roomId = useParams("sessionId").sessionId;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [snackTitle, setSnackTitle] = useState("");

  // const [roomId, setRoomId] = useState(roomer);
  const socket = useSocket();
  const handleUserJoined = useCallback((data) => {
    setSnackTitle(data.username);
    setOpenSnack(true);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  useEffect(() => {
    const cookievalue = Cookies.get(roomId);

    if (cookievalue) {
      setIsLoggedIn(true);
    }
  }, [roomId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  // console.log("username in page of instant is ", userName);

  return (
    <>
      {open ? (
        <div>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
            setUserName={setUserName}
            isLoggedIn={isLoggedIn}
            password={"123456"}
            setIsLoggedIn={setIsLoggedIn}
            roomId={roomId}
            userName={userName}
          />
        </div>
      ) : (
        <>
          <Header username={userName} />
          <MainInstantContent username={userName} roomId={roomId} />
        </>
      )}
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message={`${snackTitle} has joined the room`}
      />
    </>
  );
};

export default page;
