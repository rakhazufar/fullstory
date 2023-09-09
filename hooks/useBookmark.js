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

export const useBookmarkByUser = ({ email }) => {
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
        return err;
      }
    };

    BookmarkedPost();
  }, [email]);
  return bookmarkPosts;
};
