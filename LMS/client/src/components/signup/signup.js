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
  const [disableSignUp, setDisableSignUp] = useState(true); // State to manage sign-up button disable
  const [error, setError] = useState(null);

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

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Validate if name contains digits
    if (/\d/.test(value)) {
      setDisableSignUp(true);
      setError("Username cannot contain any digits.");
    } else {
      setDisableSignUp(false);
      setError('');
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value.length > 30) {
      setError("Email cannot exceed 30 characters");
      setDisableSignUp(true); // Disable submit button
    } else if (!emailRegex.test(value)) {
      setError("Invalid email format");
      setDisableSignUp(true); // Disable submit button
    } else {
      setError(null);
      setDisableSignUp(false); // Enable submit button
    }
  };
  

  // Validation on change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 30) {
      setError("Password cannot exceed 30 characters");
      setDisableSignUp(true); // Disable submit button
    }
    else if(value.length<8){
      setError("Password cannot less than 8 characters");
      setDisableSignUp(true);
    } 
    else {
      setError(null);
      setDisableSignUp(false); // Enable submit button
    }
  };
  const handleSubmit = async () => {
    if(!password || !email || !name){
      return setDisableSignUp(true)
    }
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
        width:'100vw',
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
          onChange={handleNameChange} // Validation on change
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          onChange={handleEmailChange}        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handlePasswordChange}        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
          disabled={disableSignUp} // Disable sign-up button based on state
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
