"use client";

import { Typography, Box, Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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

  const bookmark = useGetBookmarkValue({
    postId: data.id,
    email: session?.user.email,
    session,
    setBookmarked,
  });

  const getLiked = useGetLikedValue({
    postId: data.id,
    email: session?.user.email,
    session,
    setLiked,
  });

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={data?.author.image}
          alt={data?.author.name}
          sx={{ width: 40, height: 40 }}
        />
        <Typography sx={{ fontWeight: "700" }}>{data?.author.name}</Typography>
      </Box>
      <Typography style={{ whiteSpace: "pre-line" }}>
        {data?.content}
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
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
