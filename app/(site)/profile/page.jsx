"use client";

import { Typography, Box, Tabs, Tab, Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Posts from "@components/Post";
import { usePostsByUser, useLikedPostsByUser } from "@hooks/usePosts";

function Profile() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const allPosts = usePostsByUser({ email });
  const likedPosts = useLikedPostsByUser({ email });
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };
  return (
    <Box
      container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
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
      <Box>
        <Tabs value={currentTabIndex} onChange={handleTabChange} centered>
          <Tab label="Posts" />
          <Tab label="Likes" />
          <Tab label="Bookmark" />
        </Tabs>
      </Box>
      {/* Content Tabs */}
      <Box>
        {/* Posts Contents */}
        {currentTabIndex === 0 && (
          <Box sx={{ p: 3, maxWidth: "100%" }}>
            {allPosts ? (
              allPosts.map((post) => <Posts key={post.id} data={post} />)
            ) : (
              <Typography>No Posts</Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Liked Post */}
      <Box>
        {/* Posts Contents */}
        {currentTabIndex === 1 && (
          <Box sx={{ p: 3, maxWidth: "100%" }}>
            {likedPosts ? (
              likedPosts.map((post) => <Posts key={post.id} data={post} />)
            ) : (
              <Typography>No Posts</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
