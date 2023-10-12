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
import { useLikes, useGetLikedValue, useHandleLike } from "@hooks/useLike";
import {
  useBookmark,
  useGetBookmarkValue,
  useHandleBookmark,
} from "@hooks/useBookmark";

export default function Post({ data }) {
  const { data: session } = useSession();
  const postId = data.id;
  const { push } = useRouter();
  const createdAt = data.createdAt;
  const timeDifference = getTimeDifference(createdAt);

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
        gap: 1,
        borderColor: "black",
      }}
    >
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

      <Box sx={{ display: "flex", gap: 12 }}>
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
      </Box>
    </Box>
  );
}
