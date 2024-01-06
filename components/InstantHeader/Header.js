"use client";
import PageHeader from "@components/PageHeader/PageHeader";
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
import classes from "./Header.module.css";
import { useEffect, useState } from "react";
import { ContentCopy, Edit } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";

const SimpleDialog = ({
  setOpen,
  onClose,
  selectedValue,
  open,
  setUserName,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [tempname, setTempName] = useState("");
  const handleSubmit = (e) => {
    setUserName(tempname);

    handleClose();
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
      <div
        style={{
          display: "flex",
          margin: "10px",
          padding: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
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

const Header = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(username);
  const [openSnack, setOpenSnack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [selectedValue, setSelectedValue] = useState();

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

  const handleCopy = () => {
    setOpenSnack(true);
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

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
          <Typography
            sx={{
              margin: "10px",
              marginRight: "3px",
              padding: "5px",
              fontWeight: "600",
              fontSize: "20px",
              opacity: "0.8",
            }}
          >
            {userName}
          </Typography>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <Edit sx={{ color: "#1976d2" }} />
          </IconButton>
          <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
            <Button
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "5px 7px",
                padding: "8px",
              }}
              title="click to copy"
              endIcon={<ContentCopy />}
              variant="outlined"
            >
              Copy URL
            </Button>
          </CopyToClipboard>
          <CopyToClipboard text={"123456"} onCopy={handleCopy}>
            <Button
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "5px 7px",
                padding: "8px",
              }}
              title="click to copy"
              endIcon={<ContentCopy />}
              variant="outlined"
            >
              Pass: {`123456`}
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        setUserName={setUserName}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied Succesfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
