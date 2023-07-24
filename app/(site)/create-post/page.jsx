'use client'

import { Box, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const router = useRouter();
  const { data: session, status } = useSession()


  return (
      <Box container component="main" sx={{ height: '100vh', width: '100vw' }}>
        <CssBaseline />
        <Typography>
            
        </Typography>
      </Box>
  );
}