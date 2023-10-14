import { Typography, Box, Avatar } from "@mui/material";
import getTimeDifference from "@utils/getTimeDifference";

export default function Comment({ commentData, postAuthor }) {
  const timeDifference = getTimeDifference(commentData.createdAt);

  if (!commentData) {
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
        Ups, something went wrong
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        gap: 1,
        borderColor: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          cursor: "pointer",
        }}
      >
        <Avatar
          src={commentData.user.image}
          alt={commentData.user.name}
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography sx={{ fontWeight: "700" }}>
            {commentData.user.name}
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: 12, color: "gray" }}>
            Replying to {postAuthor}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: 13,
            color: "gray",
            paddingBottom: 3,
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
      <Box style={{ maxWidth: "100%", cursor: "pointer" }}>
        <Typography
          style={{
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {commentData.content}
        </Typography>
      </Box>

      {/* <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ChatBubbleOutlineIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleLike("like");
              }}
            />
            <Typography>{totalLikes}</Typography>
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
      </Box> */}
    </Box>
  );
}
