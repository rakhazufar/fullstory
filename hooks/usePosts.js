"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { readSlug } from "@libs/slug";

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

export const usePostsByUser = ({ email, reloadKey } = {}) => {
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
  }, [email, reloadKey]);

  return Posts;
};

export const useLikedPostsByUser = ({ email, reloadKey } = {}) => {
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
  }, [email, reloadKey]);

  return Posts;
};

export const useProfilePostsByUser = ({ slug }) => {
  const [Posts, setPosts] = useState(null);

  useEffect(() => {
    const getProfilePosts = async () => {
      if (!slug) {
        return;
      }
      try {
        const Posts = await axios.get("/api/profilePostsByUser", {
          params: {
            slug,
          },
        });
        setPosts(Posts.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProfilePosts();
  }, []);

  return Posts;
};
