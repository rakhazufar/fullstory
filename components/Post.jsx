"use client";

import { Typography, Box, Avatar } from "@mui/material";
import getTimeDifference from "@utils/getTimeDifference";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CreatePostMobile } from "./CreatePost";
import { useEffect, useState } from "react";
import { useCreateComment, useGetTotalComments } from "@hooks/useComment";
import { useLikes, useGetLikedValue, useHandleLike } from "@hooks/useLike";
import {
  useBookmark,
  useGetBookmarkValue,
  useHandleBookmark,
} from "@hooks/useBookmark";

export default function Post({ data }) {
  const { data: session } = useSession();
  const postId = data.id;
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalComment, setTotalComment] = useState(0);
  const { push } = useRouter();
  const createdAt = data.createdAt;
  const timeDifference = getTimeDifference(createdAt);

  const createComment = useCreateComment();
  const getTotalComment = useGetTotalComments();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  useEffect(() => {
    const getComment = async () => {
      const totalComment = await getTotalComment(postId);
      setTotalComment(totalComment);
    };
    getComment();
  }, []);

  const [bookmarked, setBookmarked, handleBookmark] = useHandleBookmark(
    false,
    data.id,
    session?.user.email
  );

  const [liked, setLiked, handleLike] = useHandleLike(
    false,
    data.id,
    session?.user.email
  );

  const totalLikes = useLikes({ postId, liked });
  const totalBookmark = useBookmark({ postId, bookmarked });

  useGetBookmarkValue({
    postId: data.id,
    email: session?.user.email,
    session,
    setBookmarked,
  });

  useGetLikedValue({
    postId: data.id,
    email: session?.user.email,
    session,
    setLiked,
  });

  const handleCheckProfile = (data) => {
    push(`/profile/${data}`);
  };

  if (!data) {
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
        padding: 2,
        px: 3,
        gap: 1,
        borderColor: "black",
      }}
    >
      <CreatePostMobile
        open={open}
        handleClose={handleClose}
        textButton="Reply"
        replyingTo={data.author.name}
        handleSubmit={createComment}
        update={handleUpdate}
        postId={postId}
      />
      <Box
        onClick={() => handleCheckProfile(data.author.slug)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          cursor: "pointer",
        }}
      >
        <Avatar
          src={data?.author.image}
          alt={data?.author.name}
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography sx={{ fontWeight: "700" }}>
            {data?.author.name}
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: 12, color: "gray" }}>
            {data?.author.email}
          </Typography>
        </Box>
        <Typography
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
        </Typography>
      </Box>
      <Box
        style={{ maxWidth: "100%", cursor: "pointer" }}
        onClick={() => {
          push(`/postDetail/${postId}`);
        }}
      >
        <Typography
          style={{
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {data?.content}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ChatBubbleOutlineIcon
              style={{ cursor: "pointer" }}
              onClick={handleClickOpen}
            />
            <Typography>{totalComment}</Typography>
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
      </Box>
    </Box>
  );
}
