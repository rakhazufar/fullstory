"use client";

import { Typography, Box, Tabs, Tab, Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Posts from "@components/Post";
import { usePostsByUser, useLikedPostsByUser } from "@hooks/usePosts";
import { useBookmarkByUser } from "@hooks/useBookmark";
import ProfilePicture from "@components/ProfilePicture";

function Profile() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const allPosts = usePostsByUser({ email });
  const likedPosts = useLikedPostsByUser({ email });
  const bookmarkedPost = useBookmarkByUser({ email });
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };
  return (
    <Box
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
        <ProfilePicture />
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
            {allPosts.length != 0 ? (
              allPosts.map((post) => <Posts key={post.id} data={post} />)
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>No Posts</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Liked Post */}
      <Box>
        {/* Posts Contents */}
        {currentTabIndex === 1 && (
          <Box sx={{ p: 3, maxWidth: "100%" }}>
            {likedPosts.length != 0 ? (
              likedPosts.map((post) => <Posts key={post.id} data={post} />)
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>No Posts</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Bookmarked Post */}
      <Box>
        {/* Posts Contents */}
        {currentTabIndex === 2 && (
          <Box sx={{ p: 3, maxWidth: "100%" }}>
            {bookmarkedPost.length != 0 ? (
              bookmarkedPost.map((post) => <Posts key={post.id} data={post} />)
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>No Posts</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
