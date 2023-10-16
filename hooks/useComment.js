"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { readSlug } from "@libs/slug";

export const useGetComment = ({ updateTimeline = "" } = {}) => {
  const [Comment, setComment] = useState([]);

  useEffect(() => {
    const getComment = async () => {
      try {
        const Comment = await axios.get("/api/post");
        setComment(Comment.data);
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    };

    getComment();
  }, [updateTimeline]);

  return Comment;
};

export const useCreateComment = () => {
  const createComment = async (formData) => {
    try {
      const Comment = await axios.post("/api/comment", formData);
      console.log(Comment);
      return Comment;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  return createComment;
};

export const useGetComments = () => {
  const getComments = async (postId) => {
    try {
      const Posts = await axios.get("/api/comment", {
        params: {
          postId,
        },
      });

      return Posts.data;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  return getComments;
};

export const useGetTotalComments = () => {
  const getTotalComments = async (postId) => {
    try {
      const Posts = await axios.get("/api/comment/total", {
        params: {
          postId,
        },
      });

      return Posts.data;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  return getTotalComments;
};
// export const useLikedPostsByUser = ({ email, reloadKey } = {}) => {
//   const [Posts, setPosts] = useState([]);
//   useEffect(() => {
//     const getPosts = async () => {
//       if (!email) {
//         return;
//       }
//       try {
//         const Posts = await axios.get("/api/likedPostsByUser", {
//           params: {
//             email,
//           },
//         });
//         setPosts(Posts.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getPosts();
//   }, [email, reloadKey]);

//   return Posts;
// };

// export const useProfilePostsByUser = ({ slug }) => {
//   const [Posts, setPosts] = useState(null);

//   useEffect(() => {
//     const getProfilePosts = async () => {
//       if (!slug) {
//         return;
//       }
//       try {
//         const Posts = await axios.get("/api/profilePostsByUser", {
//           params: {
//             slug,
//           },
//         });
//         setPosts(Posts.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getProfilePosts();
//   }, []);

//   return Posts;
// };
