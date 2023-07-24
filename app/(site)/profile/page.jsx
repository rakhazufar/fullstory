'use client'

import { Grid, Typography, CssBaseline, Box, Button, Avatar } from '@mui/material';
import { useSession } from "next-auth/react"
import Image from 'next/image';
function Profile() {
  const { data: session } = useSession()
  console.log(session)

  return (
      <Box container component="main"
            sx={{
              width: '100vw',
              display: 'flex',
              flexDirection: 'column'
              }}>
        <CssBaseline />
        <Grid xs={4}
          sx={{
            backgroundColor: "grey",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
          <Box sx={{borderRadius: '150px', overflow: 'hidden', mt: 10, mb: 3}}>
          {session?.user?.image ? (
            <Image
            alt={session.user.name}
            src={session.user.image}
            width={150}
            height={150}
            sx={{ margin: 3 }}
            />
          ) : (
              <Avatar
                sx={{ width: 200, height: 200, margin:2 }}
              >
                <Typography variant="h2">
                  {session?.user.name[0].toUpperCase()}
                </Typography>
              </Avatar> 
          )}
          </Box>
          <Typography variant='h4' sx={{fontWeight: 100, color:'white'}} align='center'>
              {session?.user.name} 
          </Typography>          
        </Grid>
        <Grid xs={8}
         sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
          }}
        >
          <Typography variant='h5'>
              you have no post
          </Typography>
        </Grid>
      </Box>
  )
}

export default Profile
