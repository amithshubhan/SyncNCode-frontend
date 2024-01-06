"use client";
import PageHeader from "@components/PageHeader/PageHeader";
import { useState, useEffect, useContext, useCallback } from "react";
import classes from "./Header.module.css";
import { Button, Dialog, DialogActions } from "@mui/material";
import { ChevronRightOutlined } from "@mui/icons-material";
import { PageContext, usePageContext } from "@components/Context/PageContext";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSocket } from "@components/Context/SocketProvider";
import Cookies from "js-cookie";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, roomId } = props;
  const newpath = `/instant-session/${roomId}`;
  const router = useRouter();
  // const socket = useSocket();

  // const handleRoomJoin = useCallback((data) => {
  //   console.log("roomer is ", data.roomId);
  // }, []);

  // useEffect(() => {
  //   socket.on("room:join", handleRoomJoin);
  //   return () => {
  //     socket.off("room:join", handleRoomJoin);
  //   };
  // }, [socket, handleRoomJoin]);

  // console.log("socket is ", socket);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleCreateLocal = useCallback(
    (e) => {
      handleClose();
      Cookies.set(roomId, "true"); //try passing the hash of roomid and password generated instead of true

      router.push(newpath);
    },
    [roomId]
  );

  const handleJoinLocal = (e) => {
    handleClose();
    handleJoin(e);
  };

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
      <h1
        className="text-primary "
        style={{
          fontSize: "20px",
          fontWeight: 600,
          margin: "5px 5px",
          display: "flex",
          justifyContent: "flex-start",
          padding: "5px 10px",
        }}
      >
        Select to proceed
      </h1>
      <Button
        endIcon={<ChevronRightOutlined />}
        className={`text-primary ${classes.dialog_button}`}
        onClick={handleCreateLocal}
      >
        1. Create a new instant room
      </Button>

      <Button
        endIcon={<ChevronRightOutlined />}
        className={`text-primary ${classes.dialog_button}`}
        onClick={handleJoinLocal}
      >
        2. Join an existing instant room
      </Button>
      <DialogActions>
        <Button variant="Text" className="text-primary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Header = ({ roomId }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleInstantSession = () => {
    handleClickOpen();
  };
  return (
    <>
      <div className={classes.main_container}>
        <div className={classes.title_styles}>
          <div className={classes.image_styles}>
            <img src="/assets/logo.png" height={"40px"} width={"40px"} />
          </div>
          <PageHeader title={"SyncNCode"} />
        </div>
        <div className={classes.button_styles}>
          <Button
            variant="outlined"
            onClick={handleInstantSession}
            sx={{ margin: "0px 5px" }}
          >
            Instant Session
          </Button>
          <Button variant="text" sx={{ margin: "0px 5px" }}>
            Login
          </Button>
        </div>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        roomId={roomId}
      />
    </>
  );
};

export default Header;
