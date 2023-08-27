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
        return err;
      }
    };

    getLike();
  }, [postId, liked]);

  return totalLike;
};
