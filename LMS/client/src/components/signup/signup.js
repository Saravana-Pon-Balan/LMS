import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import cookieManager from "../../manager/cookieManager";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    const { email, name, picture } = jwtDecode(response.credential);
    console.log(email)
    await axios.post("http://localhost:3001/create_user", {
      email: email,
      name: name,
      profilePic: picture,
    }).then((res) => {
      // Set user information using response data
      const userData = res.data;
      cookieManager.setUserInfo(userData); // Assuming userData contains necessary user information
      navigate('/');
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:3001/create_user", {
      email: email,
      name: name,
      password: password,
    }).then((res) => {
      // Set user information using response data
      const userData = res.data;
      cookieManager.setUserInfo(userData); // Assuming userData contains necessary user information
      navigate('/');
    }).catch((err) => {
      console.log(err);
    });
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
        Sign up
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          autoComplete="name"
          autoFocus
          onChange={(e)=>setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      <GoogleOAuthProvider clientId="714486383876-mgf5pqd34f2f22fq220osuc25gp1anig.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </Box>
  );
}

export default SignUp;