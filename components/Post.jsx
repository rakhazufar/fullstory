"use client";

import { Typography, Box, Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useLikes } from "@hooks/useLike";
import { useBookmark } from "@hooks/useBookmark";

export default function Post({ data }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { data: session } = useSession();
  const postId = data.id;

  const totalLikes = useLikes({ postId, liked });
  const totalBookmark = useBookmark({ postId, bookmarked });

  const handleLike = async (action) => {
    if (action === "like") {
      try {
        const like = await axios.post("/api/post/like", {
          postId: data.id,
          email: session?.user.email,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLiked(true);
      }
    }

    if (action === "unlike") {
      try {
        const unlike = await axios.delete("/api/post/like", {
          params: {
            postId: data.id,
            email: session?.user.email,
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLiked(false);
      }
    }
  };

  const handleBookmark = async (action) => {
    if (action == "bookmark") {
      try {
        const bookmark = await axios.post("/api/bookmark", {
          postId: data.id,
          email: session?.user.email,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setBookmarked(true);
      }
    }

    if (action == "unbookmark") {
      try {
        const unbookmark = await axios.delete("/api/bookmark", {
          params: {
            postId: data.id,
            email: session?.user.email,
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        setBookmarked(false);
      }
    }
  };

  useEffect(() => {
    const checkLiked = async () => {
      const Liked = await axios.get("/api/post/getLikedValue", {
        params: {
          postId: data.id,
          email: session?.user.email,
        },
      });

      setLiked(Liked.data.isLiked);
    };

    const checkBookmarked = async () => {
      const bookmark = await axios.get("/api/bookmark/getBookmarkValue", {
        params: {
          postId: data.id,
          email: session?.user.email,
        },
      });

      setBookmarked(bookmark.data.isBookmarked);
    };

    checkBookmarked();
    checkLiked();
  }, [session]);

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
        Something went wrong with this one
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
