"use client";

import { Typography, Box, Avatar, Tabs, Tab, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function PostDetail({ params }) {
  const [postDetail, setPostDetail] = useState({});
  const postId = params.id;
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const data = await axios.get("/api/postById", {
          params: {
            postId,
          },
        });
        setPostDetail(data.data);
      } catch (err) {
        console.error(err);
        throw new Error(err.message);
      }
    };

    getPostDetail();
  }, []);
  console.log(postDetail);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        paddingTop: "15%",
      }}
    >
      {Object.keys(postDetail).length != 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            gap: 1,
            borderColor: "black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <Avatar
              src={postDetail?.author.image}
              alt={postDetail?.author.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography sx={{ fontWeight: "700" }}>
                {postDetail?.author.name}
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: 12, color: "gray" }}
              >
                {postDetail?.author.email}
              </Typography>
            </Box>
            {/* <Typography
            sx={{
              fontWeight: "400",
              fontSize: 16,
              color: "gray",
              paddingBottom: 3,
            }}
          >
            <span
              style={{
                color: "darkgray",
                fontSize: 25,
                fontWeight: "900",
              }}
            >
              ·
            </span>{" "}
            {timeDifference}
          </Typography> */}
          </Box>
          <Box style={{ maxWidth: "100%" }}>
            <Typography
              style={{
                whiteSpace: "pre-line",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {postDetail?.content}
            </Typography>
          </Box>

          {/* <Box sx={{ display: "flex", gap: 12 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatBubbleOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleLike("like");
                }}
              />
              <Typography>{totalLikes}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {liked ? (
                <FavoriteIcon
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => {
                    handleLike("unlike");
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleLike("like");
                  }}
                />
              )}
              <Typography>{totalLikes}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {bookmarked ? (
                <BookmarkIcon
                  style={{ color: "orange", cursor: "pointer" }}
                  onClick={() => {
                    handleBookmark("unbookmark");
                  }}
                />
              ) : (
                <BookmarkBorderIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleBookmark("bookmark");
                  }}
                />
              )}
              <Typography>{totalBookmark}</Typography>
            </Box>
          </Box>
        </Box> */}
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}

export default PostDetail;
