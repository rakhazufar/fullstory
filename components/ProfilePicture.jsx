"use client";

import {
  Box,
  Avatar,
  Typography,
  Modal,
  Fade,
  Button,
  Backdrop,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUploadPhoto } from "@hooks/useUploadPhoto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ProfilePicture = ({ image, name, email }) => {
  const [open, setOpen] = useState(false);
  const { data: session, update } = useSession();
  const [fileInput, setFileInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    show: false,
  });

  useEffect(() => {
    setOpen(false);
  }, [session]);

  if (email !== session.user.email) {
    return <ProfilePictureOtherPeople image={image} name={name} />;
  }

  async function handleInputFile(e) {
    const file = e.target.files[0];
    if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
      setFileInput(file);
      setAlert({ message: "", show: false });
    } else {
      setAlert({ message: "File too large", show: true });
      setIsLoading(false);
    }
    console.log(file, fileInput);
  }
  async function handleUpload() {
    setIsLoading(true);
    if (!session) {
      setAlert({ message: "Session is not available", show: true });
      setIsLoading(false);
      return;
    }

    if (!fileInput) {
      setAlert({ message: "No image are uploaded", show: true });
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", fileInput);
    const res = await useUploadPhoto(
      formData,
      { email: session?.user.email },
      { imageURL: session?.user.image }
    );

    if (res.status == "OK") {
      await update({
        ...session,
        user: {
          ...session?.user,
          image: res.data.image,
        },
      });
    }
    setIsLoading(false);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFileInput("");
    setAlert({
      message: "",
      show: false,
    });
  };
  return (
    <>
      <Box
        sx={{
          height: "inherit",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: {
            xl: "14vh",
            lg: "15vh",
            sm: "16vh",
            xs: "17vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            ":hover img": {
              opacity: 0.3,
            },
            ":hover p": {
              opacity: 1,
            },
          }}
          onClick={handleOpen}
        >
          <Box
            sx={{
              height: {
                lg: 200,
                xs: 150,
              },
              width: {
                lg: 200,
                xs: 150,
              },
              backgroundColor: "black",
              borderRadius: "170px",
            }}
          >
            {image ? (
              <Box
                component="img"
                alt="photo profile"
                src={image}
                sx={{
                  height: {
                    lg: 200,
                    md: 175,
                    xs: 150,
                  },
                  cursor: "pointer",
                  width: {
                    lg: 200,
                    xs: 150,
                  },
                  borderRadius: "170px",
                  transition: ".5s ease",
                  backgroundColor: "black",
                  backfaceVisibility: "hidden",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  height: {
                    lg: 200,
                    md: 175,
                    xs: 150,
                  },
                  cursor: "pointer",
                  width: {
                    lg: 200,
                    xs: 150,
                  },
                  borderRadius: "170px",
                  transition: ".5s ease",
                  backgroundColor: "gray",
                  backfaceVisibility: "hidden",
                }}
              >
                <Typography variant="h2">{name[0].toUpperCase()}</Typography>
              </Avatar>
            )}
          </Box>
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              opacity: 0,
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Change Photo
          </Typography>
        </Box>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {fileInput || image ? (
              <Box
                component="img"
                alt="photo profile"
                src={fileInput ? URL.createObjectURL(fileInput) : image}
                sx={{
                  height: {
                    lg: 200 * 1.5,
                    xs: 150,
                  },
                  width: {
                    lg: 200 * 1.5,
                    xs: 150,
                  },
                  borderRadius: "170px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  height: {
                    lg: 200 * 1.5,
                    xs: 150,
                  },
                  width: {
                    lg: 200 * 1.5,
                    xs: 150,
                  },
                }}
              >
                <Typography variant="h2">{name[0].toUpperCase()}</Typography>
              </Avatar>
            )}
            {alert.show && (
              <Typography sx={{ color: "red" }}>{alert.message}</Typography>
            )}
            <Button
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                width: {
                  lg: 200,
                  xs: 150,
                },
              }}
            >
              Upload Photo
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleInputFile}
              />
            </Button>

            {/* Task: use useformstatus to make pending button */}
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={isLoading}
              sx={{
                width: {
                  lg: 200,
                  xs: 150,
                },
              }}
            >
              {isLoading ? "Loading..." : "Change Photo"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const ProfilePictureOtherPeople = ({ name, image }) => (
  <Box
    sx={{
      height: "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      mt: {
        lg: 23,
        xs: 22,
      },
    }}
  >
    {image ? (
      <Box
        component="img"
        alt="photo profile"
        src={image}
        sx={{
          height: {
            lg: 200,
            md: 175,
            xs: 150,
          },
          width: {
            lg: 200,
            xs: 150,
          },
          borderRadius: "170px",
          transition: ".5s ease",
          backgroundColor: "black",
          backfaceVisibility: "hidden",
        }}
      />
    ) : (
      <Avatar
        sx={{
          height: {
            lg: 200,
            xs: 150,
          },
          width: {
            lg: 200,
            xs: 150,
          },
          borderRadius: "170px",
          transition: ".5s ease",
          backgroundColor: "gray",
          backfaceVisibility: "hidden",
        }}
      >
        <Typography variant="h2">{name[0].toUpperCase()}</Typography>
      </Avatar>
    )}
  </Box>
);

export default ProfilePicture;
