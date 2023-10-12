"use client";

import { Box, Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box>
        <h2>Something went wrong!</h2>
        <Button variant="contained" onClick={() => reset()}>
          Try again
        </Button>
      </Box>
    </Box>
  );
}
