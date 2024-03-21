// login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import cookieManager from "../../manager/cookieManager";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    const { email } = jwtDecode(response.credential);
    
      await axios.post("http://localhost:3001/search_user", {
        email: email,
      }).then((res)=>{
      const userData = res.email; 
      cookieManager.setUserInfo(email);
      navigate('/');
    }).catch ((err)=> {
      console.log(err);
    })
  };
  const handleSubmit = async () => {
     await axios.post("http://localhost:3001/search_user", {
        email: email,
        password: password
      }).then((res)=>{
        const userData = res.data;
        cookieManager.setUserInfo(userData);
        navigate('/');
      }).catch((error) =>{
      setError(error);
    })
  };

  return (
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
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2">
              Don't have an account? Sign Up
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
              fullWidth
            />
          </GoogleOAuthProvider>
    </Box>
  );
};

export default Login;
