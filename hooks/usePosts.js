"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const usePosts = ({ updateTimeline }) => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const Posts = await axios.get("/api/post");
        setPosts(Posts.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [updateTimeline]);

  return Posts;
};