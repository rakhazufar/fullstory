"use client";

import { Typography, Box, Tabs, Tab, Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Posts from "@components/Post";
import { useProfilePostsByUser } from "@hooks/usePosts";
import ProfilePicture from "@components/ProfilePicture";

function Profile({ params }) {
  const { data: session } = useSession();
  const { push } = useRouter();
  const slug = params.slug;
  const dataUser = useProfilePostsByUser({ slug });
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(() => {
    if (dataUser?.email && session) {
      if (dataUser?.email === session?.user.email) {
        push("/profile");
      }
    }
  }, [session, dataUser]);
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
        {dataUser?.name && (
          <ProfilePicture
            image={dataUser.image}
            name={dataUser.name}
            email={dataUser.email}
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
            lg: 13,
            xs: 8,
          },
        }}
      >
        <Typography variant="h5" sx={{ fontSize: 20 }}>
          {dataUser && dataUser.name}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 14, color: "gray" }}>
          {dataUser && dataUser.email}
        </Typography>
      </Box>

      {/* Tabs, pakai MUI tabs */}
      <Box>
        <Tabs value={currentTabIndex} onChange={handleTabChange} centered>
          <Tab label="Posts" />
        </Tabs>
      </Box>
      {/* Content Tabs */}
      <Box>
        {/* Posts Contents */}
        {currentTabIndex === 0 && (
          <Box sx={{ p: 3, maxWidth: "100%" }}>
            {dataUser && dataUser.post && dataUser.post.length > 0 ? (
              dataUser.post.map((post) => <Posts key={post.id} data={post} />)
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
