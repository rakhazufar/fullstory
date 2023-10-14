"use client";

import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  responsiveFontSizes,
} from "@mui/material";
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CreatePost({ handleSubmit, update, postId = "" }) {
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [saverity, setSaverity] = useState("");
  const { data: session } = useSession();

  const handleSubmitLocal = async (event) => {
    event.preventDefault();
    const email = session?.user?.email;
    try {
      const response = await handleSubmit({ content, email, postId });
      update();
      setContent("");
      setAlertMessage(response.data);
      setSaverity("success");
      setShowAlert(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("ups, something wrong");
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

export function CreatePostMobile({
  open,
  handleClose,
  update,
  textButton,
  replyingTo,
  handleSubmit,
  postId = "",
}) {
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [saverity, setSaverity] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;

  const handleSubmitLocal = async (event) => {
    event.preventDefault();
    try {
      const response = await handleSubmit({ content, email, postId });
      handleClose();
      update();
      setContent("");
    } catch (error) {
      console.log(error);
      setAlertMessage("ups, error");
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
              {textButton}
            </Button>
          </Toolbar>
        </AppBar>

        <TextField
          sx={{ my: 3, width: "80%", mx: "auto" }}
          id="outlined-textarea"
          label={replyingTo ? `Reply to ${replyingTo}` : "Share your story!"}
          multiline
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        {showAlert && <Alert severity={saverity}>{alertMessage}</Alert>}
      </Dialog>
    </Box>
  );
}
