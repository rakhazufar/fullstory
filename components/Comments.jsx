"use client";

import { Typography, Box, Avatar } from "@mui/material";
import { useGetComments } from "@hooks/useComment";
import { useState, useEffect } from "react";
import Comment from "./Comment";

export default function Comments({ postId, update, postAuthor }) {
  const [comments, setComments] = useState([]);

  const getComments = useGetComments();

  useEffect(() => {
    const getAllComments = async () => {
      const data = await getComments(postId);
      setComments(data);
    };
    getAllComments();
  }, [update]);

  if (!postId) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 1,
          borderColor: "black",
        }}
      >
        Something went wrong
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 1,
      }}
    >
      {comments ? (
        comments.map((comment) => (
          <Box key={comment.id}>
            <Comment commentData={comment} postAuthor={postAuthor} />
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "gray",
                opacity: 0.7,
              }}
            ></Box>
          </Box>
        ))
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
