"use client";

import { Typography, CssBaseline, Fab, Box } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { CreatePost, CreatePostMobile } from "@components/CreatePost";
import Posts from "@components/Post";
import { usePosts, useCreatePost } from "@hooks/usePosts";

export default function Home() {
  const [updateTimeline, setUpdateTimeline] = useState(false);

  const createPost = useCreatePost();

  const [open, setOpen] = useState(false);

  const allPosts = usePosts({ updateTimeline });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateTimeline = () => {
    setUpdateTimeline((prev) => !prev);
  };

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Box sx={{ ...flexCenter, py: 8 }}>
        <CssBaseline />
        <Box sx={{ width: { md: "70vw" } }}>
          <CreatePostMobile
            open={open}
            handleClose={handleClose}
            update={handleUpdateTimeline}
            textButton="Share"
            replyingTo={false}
            handleSubmit={createPost}
          />
          <CreatePost
            handleSubmit={createPost}
            setUpdateTimeline={setUpdateTimeline}
            update={handleUpdateTimeline}
          />
          {allPosts ? (
            allPosts.map((post) => (
              <div key={post.id}>
                <Posts data={post} />
                <Box
                  sx={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "gray",
                    opacity: 0.7,
                  }}
                ></Box>
              </div>
            ))
          ) : (
            <Typography>Oh No, there is nothing in here</Typography>
          )}
        </Box>
        <Fab
          color="primary"
          sx={{ ...fabStyle, display: { xs: "flex", md: "none" } }}
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
}
