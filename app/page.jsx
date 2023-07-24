'use client'

import { Typography, CssBaseline, Fab, Box, Avatar } from '@mui/material';
import { useSession } from "next-auth/react"
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CreatePost, CreatePostMobile } from '@components/CreatePost';

export default function Home() {
  const { data: session } = useSession()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };

  const flexCenter ={
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <>
      <Box
        sx={{...flexCenter, py: 8}}
      >
        <CssBaseline />
          <Box sx={{width: {md: '70%'}}}>
            <CreatePostMobile open={open} handleClose={handleClose} />
            <CreatePost />
            <Box sx={{display: 'flex',
                 flexDirection: 'column', 
                 padding: 2,
                 gap: 1,
                 borderColor: 'black'
                 }}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Avatar 
                    src={session?.user?.image}
                    alt={session?.user.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant='h6'>
                    {session?.user.name}
                  </Typography>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos, quis porro aliquid mollitia minus cumque! Quidem corporis sit odit esse molestiae veniam quo et. Doloremque tempora omnis iure maxime?
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <FavoriteBorderIcon  onClick={() => { console.log('onClick'); }}/>
                    <Typography>
                      100 Like
                    </Typography>
                  </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex',
                 flexDirection: 'column', 
                 padding: 2,
                 gap: 1,
                 borderColor: 'black'
                 }}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Avatar 
                    src={session?.user?.image}
                    alt={session?.user.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant='h6'>
                    {session?.user.name}
                  </Typography>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos, quis porro aliquid mollitia minus cumque! Quidem corporis sit odit esse molestiae veniam quo et. Doloremque tempora omnis iure maxime?
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <FavoriteBorderIcon  onClick={() => { console.log('onClick'); }}/>
                    <Typography>
                      100 Like
                    </Typography>
                  </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex',
                 flexDirection: 'column', 
                 padding: 2,
                 gap: 1,
                 borderColor: 'black'
                 }}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Avatar 
                    src={session?.user?.image}
                    alt={session?.user.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant='h6'>
                    {session?.user.name}
                  </Typography>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos, quis porro aliquid mollitia minus cumque! Quidem corporis sit odit esse molestiae veniam quo et. Doloremque tempora omnis iure maxime?
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <FavoriteBorderIcon  onClick={() => { console.log('onClick'); }}/>
                    <Typography>
                      100 Like
                    </Typography>
                  </Box>
                </Box>
            </Box>
          </Box>
          <Fab color="primary" sx={{...fabStyle, display: { xs: 'flex', md: 'none' }}} aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
      </Box>
    </>
  )
}
