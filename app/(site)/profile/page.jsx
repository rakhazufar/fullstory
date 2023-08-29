"use client";

import {
  Grid,
  Typography,
  CssBaseline,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
function Profile() {
  const { data: session } = useSession();

  return (
    <Box
      container
      component="main"
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Grid
        xs={{
          height: "20vh",
        }}
        sx={{
          backgroundColor: "grey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "30vh",
          gap: 1,
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {session?.user?.image ? (
            <Box
              component="img"
              alt={session.user.name}
              src={session.user.image}
              sx={{
                height: {
                  lg: 200,
                  xs: 150,
                },
                width: {
                  lg: 200,
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
                  lg: 200,
                  xs: 150,
                },
                width: {
                  lg: 200,
                  xs: 150,
                },
                mb: {
                  lg: -13,
                  xs: -9,
                },
                margin: 2,
              }}
            >
              <Typography variant="h2">
                {session?.user.name[0].toUpperCase()}
              </Typography>
            </Avatar>
          )}
        </Box>
        {/* <Typography variant='h4' sx={{fontWeight: 100, color:'white'}} align='center'>
              {session?.user.name} 
          </Typography>           */}
      </Grid>

      {/* For post profile */}
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          marginTop: 10,
        }}
      >
        <Typography variant="h5">{session?.user.name} </Typography>
      </Grid>

      {/* Tabs, pakai MUI tabs */}
    </Box>
  );
}

export default Profile;
