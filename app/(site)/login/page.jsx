'use client'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [saverity, setSaverity] = useState('')
  const [data, setData] = useState({ email: '', password: ''})
  const { push } = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    signIn('credentials', {...data, redirect: false})
    .then((callback)=>{
        if(callback?.error) {
            setAlertMessage(callback.error)
            setSaverity('error')
            setShowAlert(true)
        }

        if(callback?.ok && !callback?.error) {
            setAlertMessage('User has been login')
            setSaverity('success')
            setShowAlert(true)
            push('/');
        }
    })
    .finally(()=>{
        setData({ email: '', password: ''})
    })
  }

  useEffect(()=>{
    const closeAlert = setTimeout(()=>{
        setShowAlert(false)
    }, 3000)

    return ()=>{
        clearTimeout(closeAlert)
    }
  }, [showAlert])
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', width: '100vw' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" pt={10}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={e=> setData({...data, email: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                autoComplete="current-password"
                onChange={e=> setData({...data, password: e.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {
                showAlert && (
                <Alert severity={saverity} variant="filled" >
                    {alertMessage}
                </Alert>
                )
            }
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}