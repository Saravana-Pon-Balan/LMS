import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Router from "./components/Router";
import styled from '@emotion/styled';
import Login from "./components/signup/login";
import cookieManager from './manager/cookieManager';
import SignUp from './components/signup/SignupPage';

const userData = cookieManager.getUserInfo();
const Block = styled.div`
  display:flex;
  flex-direction:column;
  background-color:;
`;
const Container = styled.div`
  position:relative;
  margin-top:5%;
`

const App = () => {
  const [open, setOpen] = useState(false);

  const pull = (data) => {
    setOpen(data);
  }

  return (
    <BrowserRouter>
      <Box>
        <CssBaseline />
        <Routes>
          {userData ? (
            <Route path="/" element={<AuthenticatedApp open={open} pull={pull} />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

const AuthenticatedApp = ({ open, pull }) => (
  <Block>
    <Sidebar SideBarState={pull} />
    <Container>
      <Router open={open} />
    </Container>
  </Block>
);

export default App;
