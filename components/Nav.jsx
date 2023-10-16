"use client";

import Image from "next/image";
import Logo from "@public/assets/images/Fullstory.svg";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Typhography from "@mui/material/Typography";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link href="/">
            <Image
              priority
              src={Logo}
              alt="fullstory logo"
              width={120}
              className="cursor-pointer"
            />
          </Link>

          {/* Web */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
            }}
          >
            {session ? (
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {session.user?.image ? (
                      <Avatar
                        sx={{ width: 35, height: 35 }}
                        src={session.user.image}
                      />
                    ) : (
                      <Avatar sx={{ width: 35, height: 35 }}>
                        {session?.user.name[0].toUpperCase()}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Link href="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 28, width: 120 }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: 28, width: 120 }}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            )}
          </Box>

          {/* Mobile */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {session ? (
                  session.user?.image ? (
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      src={session.user.image}
                    />
                  ) : (
                    <Avatar sx={{ width: 35, height: 35 }}>
                      {session?.user.name[0].toUpperCase()}
                    </Avatar>
                  )
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", display: "flex", alignItems: "flex-end" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push("/profile");
                    }}
                  >
                    <Typhography
                      align="center"
                      variant="body1"
                      sx={{ borderRadius: 28, width: 120 }}
                    >
                      Profile
                    </Typhography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        signOut({ callbackUrl: "http://localhost:3000" })
                      }
                      color="primary"
                      sx={{ borderRadius: 28, width: 120 }}
                    >
                      Sign Out
                    </Button>
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/login">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 28, width: 120 }}
                      >
                        Sign In
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/register">
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: 28, width: 120 }}
                      >
                        Register
                      </Button>
                    </Link>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
