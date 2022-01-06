import { React, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField, Typography
} from "@mui/material";

function Login({setLoggedInUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      setError('');
      const loggedInUser = {
        username: username,
        role: 'admin'
      }
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setLoggedInUser(loggedInUser);
    }
    else if (username === "developer" && password === "123456") {
      setError('');
      const loggedInUser = {
        username: username,
        role: 'developer'
      }
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setLoggedInUser(loggedInUser);
    }
    else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="Username"
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Typography variant="body3" color="error">
            {error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;