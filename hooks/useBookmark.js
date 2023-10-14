"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useBookmark = ({ postId, bookmarked }) => {
  const [bookmark, setBookmark] = useState(0);
  useEffect(() => {
    const addBookmark = async () => {
      try {
        const bookmarked = await axios.get("/api/bookmark", {
          params: {
            postId,
          },
        });

        setBookmark(bookmarked.data);
      } catch (err) {
        return err;
      }
    };

    addBookmark();
  }, [postId, bookmarked]);
  return bookmark;
};

export const useBookmarkByUser = ({ email, reloadKey }) => {
  const [bookmarkPosts, setBookmarkPosts] = useState([]);
  useEffect(() => {
    const BookmarkedPost = async () => {
      if (!email) {
        return;
      }

      try {
        const data = await axios.get("/api/bookmark/getBookmarkByUser", {
          params: {
            email,
          },
        });

        setBookmarkPosts(data.data);
      } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
      }
    };

    BookmarkedPost();
  }, [email, reloadKey]);
  return bookmarkPosts;
};

export const useGetBookmarkValue = ({
  postId,
  email,
  session,
  setBookmarked,
}) => {
  useEffect(() => {
    try {
      const checkBookmarked = async () => {
        const bookmark = await axios.get("/api/bookmark/getBookmarkValue", {
          params: {
            postId,
            email,
          },
        });

        setBookmarked(bookmark.data.isBookmarked);
      };

      checkBookmarked();
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }, [session]);
};

export const useHandleBookmark = (initialState, postId, email) => {
  const [bookmarked, setBookmarked] = useState(initialState);

  const handleBookmark = async (action) => {
    try {
      if (action === "bookmark") {
        await axios.post("/api/bookmark", {
          postId,
          email,
        });
        setBookmarked(true);
      } else if (action === "unbookmark") {
        await axios.delete("/api/bookmark", {
          params: {
            postId,
            email,
          },
        });
        setBookmarked(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return [bookmarked, setBookmarked, handleBookmark];
};
