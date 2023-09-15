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
  ButtonBase,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  height: {
    lg: "40%",
    xs: "30%",
  },
  width: {
    lg: "35%",
    xs: "50%",
  },
  p: 2,
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
  const { data: session } = useSession();

  if (email !== session.user.email) {
    return <ProfilePictureOtherPeople image={image} name={name} />;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            lg: 23,
            xs: 22,
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
              fontSize: 23,
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
            {image ? (
              <Box
                component="img"
                alt="photo profile"
                src={image}
                sx={{
                  height: {
                    lg: 200 * 1.5,
                    xs: 150,
                  },
                  width: {
                    lg: 200 * 1.5,
                    xs: 150,
                  },
                  mb: {
                    lg: -13,
                    xs: -9,
                  },
                  borderRadius: "170px",
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
                  mb: {
                    lg: -13,
                    xs: -9,
                  },
                }}
              >
                <Typography variant="h2">{name[0].toUpperCase()}</Typography>
              </Avatar>
            )}
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              sx={{
                mt: {
                  lg: 13,
                  xs: 10,
                },
                mb: 2,
                width: {
                  lg: 200,
                  xs: 150,
                },
              }}
            >
              Change Photo
              <VisuallyHiddenInput type="file" />
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
