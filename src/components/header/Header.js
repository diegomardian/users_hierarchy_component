import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

function Header({ logout, loggedInUser }) {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap align="left" sx={{ flexGrow: 1 }}>
          Hi, {loggedInUser.username}
        </Typography>
        <Button onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;