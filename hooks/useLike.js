"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const useLikes = ({ postId, liked }) => {
  const [totalLike, setTotalLike] = useState(0);

  useEffect(() => {
    const getLike = async () => {
      try {
        const postLike = await axios.get("/api/post/like", {
          params: {
            postId,
          },
        });

        setTotalLike(postLike.data);
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    };

    getLike();
  }, [postId, liked]);

  return totalLike;
};

export const useGetLikedValue = ({ postId, email, session, setLiked }) => {
  useEffect(() => {
    try {
      const checkLiked = async () => {
        const Liked = await axios.get("/api/post/getLikedValue", {
          params: {
            postId,
            email,
          },
        });

        setLiked(Liked.data.isLiked);
      };

      checkLiked();
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }, [session]);
};

export const useHandleLike = (initialState, postId, email) => {
  const [liked, setLiked] = useState(initialState);

  const handleLike = async (action) => {
    if (action === "like") {
      try {
        const like = await axios.post("/api/post/like", {
          postId,
          email,
        });
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      } finally {
        setLiked(true);
      }
    }

    if (action === "unlike") {
      try {
        const unlike = await axios.delete("/api/post/like", {
          params: {
            postId,
            email,
          },
        });
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      } finally {
        setLiked(false);
      }
    }
  };

  return [liked, setLiked, handleLike];
};
