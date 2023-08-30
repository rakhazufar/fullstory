"use client";

import { Typography, CssBaseline, Box, Tabs, Tab, Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const [value, setValue] = useState(0);
  const { data: session } = useSession();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
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
      </Box>

      {/* For post profile */}
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          marginTop: {
            lg: 13,
            xs: 8,
          },
        }}
      >
        <Typography variant="h5" sx={{ fontSize: 20 }}>
          {session?.user.name}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 14, color: "gray" }}>
          {session?.user.email}
        </Typography>
      </Box>

      {/* Tabs, pakai MUI tabs */}
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab {...a11yProps(0)} label="Item One" />
          <Tab {...a11yProps(1)} label="Item Two" />
          <Tab {...a11yProps(2)} label="Item Three" />
        </Tabs>

        {/* Panel Tabs */}
        <Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
