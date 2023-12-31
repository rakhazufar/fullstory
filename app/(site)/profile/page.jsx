"use client";

import { Typography, Box, Tabs, Tab, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Posts from "@components/Post";
import { usePostsByUser, useLikedPostsByUser } from "@hooks/usePosts";
import { useBookmarkByUser } from "@hooks/useBookmark";
import ProfilePicture from "@components/ProfilePicture";

function Profile() {
  const { data: session } = useSession();
  const [reloadKey, setReloadKey] = useState(false);
  useEffect(() => {
    setReloadKey((prev) => !prev);
  }, [session]);

  const allPosts = usePostsByUser({ email: session?.user?.email, reloadKey });
  const likedPosts = useLikedPostsByUser({
    email: session?.user?.email,
    reloadKey,
  });
  const bookmarkedPost = useBookmarkByUser({
    email: session?.user?.email,
    reloadKey,
  });
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
        {session && (
          <ProfilePicture
            image={session?.user.image}
            name={session?.user.name}
            email={session?.user.email}
          />
        )}
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
            xl: 6,
            lg: 7,
            xs: 4,
          },
        }}
      >
        <Typography variant="h5" sx={{ fontSize: 20 }}>
          {session?.user.name}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 14, color: "gray" }}>
          {session?.user.email}
        </Typography>
        {session?.user.emailVerified ? (
          ""
        ) : (
          <>
            <Typography variant="h6" sx={{ fontSize: 13, color: "red" }}>
              Not Verified, Check Your Inbox to Verify.
            </Typography>
            <Button
              component={Link}
              href="/email-verify"
              variant="outlined"
              size="small"
            >
              Haven't Received Verification Email?
            </Button>
          </>
        )}
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
