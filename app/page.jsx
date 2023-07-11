'use client'

import { Grid, Typography, CssBaseline } from '@mui/material';
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
      <Grid container component="main"
            sx={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
              }}>
        <CssBaseline />
          <Typography>
              Hallo, {session?.user.name}
          </Typography>
      </Grid>
  )
}
