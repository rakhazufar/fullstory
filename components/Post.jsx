"use client";

import { Typography, Box, Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useLikes } from "@hooks/useLike";

export default function Post({ data }) {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  const postId = data.id;

  const totalLikes = useLikes({ postId, liked });

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
      console.log(action);
      console.log({
        postId: data.id,
        email: session?.user.email,
      });
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

  useEffect(() => {
    const checkLiked = async () => {
      const Liked = await axios.get("/api/post/like/getLiked", {
        params: {
          postId: data.id,
          email: session?.user.email,
        },
      });

      setLiked(Liked.data.isLiked);
    };

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
          <Typography>{totalLikes} Like</Typography>
        </Box>
      </Box>
    </Box>
  );
}
