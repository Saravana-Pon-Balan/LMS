import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Router from "./components/Router";
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import cookieManager from './manager/cookieManager';

const Block = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff; 
`;

const Container = styled.div`
position:relative;
margin-left:5%;

`;

const App = (props) => {
  const [open, setOpen] = useState(false);
  const userData = cookieManager.getUserInfo();
  
  const pull = (data) => {
    setOpen(data);
  };

  return (
    <BrowserRouter> 
      <Box>
        <CssBaseline />
        <Block>
          {userData ? (
            <>
              <Sidebar SideBarState={pull} />
              <Container>
                <Router open={open} />
              </Container>
            </>
          ) : (
            <Container>
              <Router open={open} />
            </Container>
          )}
        </Block>
      </Box>
    </BrowserRouter>
  );
};

export default App;
