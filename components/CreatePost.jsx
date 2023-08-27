"use client";

import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect, forwardRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const handleSubmit = async (formData) => {
  try {
    const response = await axios.post("/api/post", formData);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CreatePost({ setUpdateTimeline }) {
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [saverity, setSaverity] = useState("");
  const { data: session, status } = useSession();

  const handleSubmitLocal = async (event) => {
    event.preventDefault();
    const email = session?.user?.email;
    try {
      const response = await handleSubmit({ content, email });
      console.log(response);
      setUpdateTimeline((prev) => !prev);
      setContent("");
      setAlertMessage(response);
      setSaverity("success");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.response.data);
      setSaverity("error");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const closeAlert = setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    return () => {
      clearTimeout(closeAlert);
    };
  }, [showAlert]);

  return (
    <Box
      sx={{ width: "100%", padding: 2, display: { xs: "none", md: "block" } }}
    >
      <form onSubmit={handleSubmitLocal}>
        <TextField
          fullWidth
          id="outlined-textarea"
          label="Share your story!"
          multiline
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 1, px: 5, borderRadius: 28 }}
          >
            Share
          </Button>
          {showAlert && <Alert severity={saverity}>{alertMessage}</Alert>}
        </Box>
      </form>
    </Box>
  );
}

export function CreatePostMobile({ open, handleClose, setUpdateTimeline }) {
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [saverity, setSaverity] = useState("");
  const { data: session, status } = useSession();

  const handleSubmitLocal = async (event) => {
    event.preventDefault();
    const email = session?.user?.email;
    try {
      const response = await handleSubmit({ content, email });
      handleClose();
      setUpdateTimeline((prev) => !prev);
      setContent("");
    } catch (error) {
      setAlertMessage(error.response.data);
      setSaverity("error");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const closeAlert = setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    return () => {
      clearTimeout(closeAlert);
    };
  }, [showAlert]);

  return (
    <Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "white" }}
          elevation={0}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Button
              variant="contained"
              sx={{ px: 5, borderRadius: 28 }}
              onClick={handleSubmitLocal}
            >
              Share
            </Button>
          </Toolbar>
        </AppBar>

        <TextField
          sx={{ my: 3, width: "80%", mx: "auto" }}
          id="outlined-textarea"
          label="Share your story!"
          multiline
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        {showAlert && <Alert severity={saverity}>{alertMessage}</Alert>}
      </Dialog>
    </Box>
  );
}
