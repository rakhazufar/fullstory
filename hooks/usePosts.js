"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const usePosts = ({ updateTimeline = "" } = {}) => {
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

export const usePostsByUser = ({ email } = {}) => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      if (!email) {
        return;
      }
      try {
        const Posts = await axios.get("/api/postsByUser", {
          params: {
            email,
          },
        });
        setPosts(Posts.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [email]);

  return Posts;
};

export const useLikedPostsByUser = ({ email } = {}) => {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      if (!email) {
        return;
      }
      try {
        const Posts = await axios.get("/api/likedPostsByUser", {
          params: {
            email,
          },
        });
        setPosts(Posts.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [email]);

  return Posts;
};
