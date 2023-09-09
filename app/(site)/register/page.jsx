"use client";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignInSide() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [saverity, setSaverity] = useState("");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("/api/register", data)
      .then((res) => {
        setAlertMessage("User has been registered");
        setSaverity("success");
        setShowAlert(true);
      })
      .catch((err) => {
        setAlertMessage(err.response.data);
        setSaverity("error");
        setShowAlert(true);
      });
  };

  //Protect page
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  useEffect(() => {
    const closeAlert = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(closeAlert);
    };
  }, [showAlert]);

  return (
    <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
          <Typography component="h1" variant="h5" sx={{ mt: 8 }}>
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Box sx={{ width: "100%", height: 2, backgroundColor: "gray" }} />
            <Button
              fullWidth
              variant="contained"
              onClick={() => signIn("github")}
              sx={{ mt: 2, mb: 2, backgroundColor: "black" }}
              endIcon={<GitHubIcon />}
            >
              Github Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => signIn("google")}
              sx={{ mb: 2, backgroundColor: "red" }}
              endIcon={<GoogleIcon />}
            >
              Google Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Do you have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {showAlert && (
            <Alert severity={saverity} variant="filled">
              {alertMessage}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
