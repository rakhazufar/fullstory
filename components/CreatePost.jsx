'use client'

import { Box, TextField, Typography, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/navigation';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CreatePost() {
  const router = useRouter();
  const { data: session, status } = useSession()


  return (
      <Box sx={{width: '100%', padding: 2, display: { xs: 'none', md: 'block' }}}>
        <TextField
          fullWidth
          id="outlined-textarea"
          label="Share your story!"
          multiline
        />
        <Button
          variant="contained"
          sx={{marginTop: 1, px: 5, borderRadius: 28}}
        >
          Share
        </Button>
      </Box>
  );
}


export function CreatePostMobile({open, handleClose}) {
  return (
    <Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}

      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'white' }} elevation={0} >
          <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
            <Button
              variant="contained"
              sx={{ px: 5, borderRadius: 28}}
            >
              Share
            </Button>
          </Toolbar>
        </AppBar>

        <TextField
          sx={{my: 3, width: '80%', mx: 'auto'}}
          id="outlined-textarea"
          label="Share your story!"
          multiline
        />
        
      </Dialog>
    </Box>
  );
}