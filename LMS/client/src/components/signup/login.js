import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import cookieManager from "../../manager/cookieManager";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = cookieManager.getUserInfo();
    if (userData) setUserInfo(userData);
  }, []);

  const responseGoogle = async (response) => {
    const { email} = jwtDecode(response.credential);
    console.log("email" + email);
    await axios.get("http://localhost:3001/search_user", {
      email: email,
    }).then(res)=>{
      
    };
    cookieManager.setUserInfo(email);
    setUserInfo(email);
  }

  const handleSubmit = async () => {
    // Handle form submission
  }

  return (
    <>
      {userInfo ? (
        <App userInfo={userInfo} />
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              </Grid>
            </Grid>
          </Box>
          <GoogleOAuthProvider
            clientId="714486383876-mgf5pqd34f2f22fq220osuc25gp1anig.apps.googleusercontent.com"
          >
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
              fullWidth // Make GoogleLogin button full width
            />
          </GoogleOAuthProvider>
        </Box>
      )}
    </>
  )
}

export default Login;
