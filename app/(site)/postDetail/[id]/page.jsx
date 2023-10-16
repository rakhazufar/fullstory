"use client";

import { Typography, Box, Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getTimeDifference from "@utils/getTimeDifference";
import { useSession } from "next-auth/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useLikes, useGetLikedValue, useHandleLike } from "@hooks/useLike";
import { CreatePostMobile } from "@components/CreatePost";
import { useCreateComment, useGetTotalComments } from "@hooks/useComment";
import Comments from "@components/Comments";
import {
  useBookmark,
  useGetBookmarkValue,
  useHandleBookmark,
} from "@hooks/useBookmark";

function PostDetail({ params }) {
  const [postDetail, setPostDetail] = useState({});
  const [timeDifference, setTimeDifference] = useState("");
  const [totalComment, setTotalComment] = useState(0);
  const postId = params.id;
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { push } = useRouter();
  const { data: session } = useSession();
  const createComment = useCreateComment();
  const getTotalComment = useGetTotalComments();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const data = await axios.get("/api/postById", {
          params: {
            postId,
          },
        });
        // const time = getTimeDifference(data.data.createdAt);
        // setTimeDifference(time);
        setPostDetail(data.data);
      } catch (err) {
        console.error(err);
        throw new Error(err.message);
      }
    };

    getPostDetail();
  }, []);

  const handleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  useEffect(() => {
    if (Object.keys(postDetail).length != 0) {
      const data = getTimeDifference(postDetail.createdAt);
      setTimeDifference(data);
      const getComment = async () => {
        const totalComment = getTotalComment(postDetail.id);
        setTotalComment(totalComment);
      };
      getComment();
    }
  }, [postDetail]);

  const [liked, setLiked, handleLike] = useHandleLike(
    false,
    postId,
    session?.user.email
  );
  const totalLikes = useLikes({ postId, liked });

  useGetLikedValue({
    postId,
    email: session?.user.email,
    session,
    setLiked,
  });

  const [bookmarked, setBookmarked, handleBookmark] = useHandleBookmark(
    false,
    postId,
    session?.user.email
  );

  const totalBookmark = useBookmark({ postId, bookmarked });
  useGetBookmarkValue({
    postId,
    email: session?.user.email,
    session,
    setBookmarked,
  });

  const handleCheckProfile = (data) => {
    push(`/profile/${data}`);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: {
          xl: "50%",
          lg: "60%",
          xs: "90%",
        },
        minHeight: "100vh",
        paddingTop: {
          xl: "2%",
          lg: "5%",
          sm: "8%",
          xs: "15%",
        },
      }}
    >
      {Object.keys(postDetail).length != 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            gap: 1,
            borderColor: "black",
            width: "100%",
          }}
        >
          <CreatePostMobile
            open={open}
            handleClose={handleClose}
            textButton="Reply"
            replyingTo={postDetail?.author.name}
            handleSubmit={createComment}
            update={handleUpdate}
            postId={postId}
          />
          <Box
            onClick={() => handleCheckProfile(postDetail?.author.slug)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Avatar
              src={postDetail?.author.image}
              alt={postDetail?.author.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography sx={{ fontWeight: "700" }}>
                {postDetail?.author.name}
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: 12, color: "gray" }}
              >
                {postDetail?.author.email}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: 16,
                color: "gray",
                paddingBottom: 2.5,
              }}
            >
              <span
                style={{
                  color: "darkgray",
                  fontSize: 25,
                  fontWeight: "900",
                }}
              >
                ·
              </span>{" "}
              {timeDifference}
            </Typography>
          </Box>
          <Box style={{ maxWidth: "100%" }}>
            <Typography
              style={{
                whiteSpace: "pre-line",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {postDetail?.content}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "gray",
              opacity: 0.7,
            }}
          ></Box>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ChatBubbleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleClickOpen}
                />
                <Typography>{totalComment}</Typography>
              </Box>
            </Box>
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
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "gray",
              opacity: 0.7,
            }}
          ></Box>
          <Comments
            postId={postId}
            update={update}
            postAuthor={postDetail?.author.name}
          />
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}

export default PostDetail;
