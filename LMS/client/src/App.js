import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Router from "./components/Router";
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';

const Block = styled.div`
  display:flex;
  flex-direction:coloumn;
  background-color:;
`;

const App = () => {
  
  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <Block>
          <Sidebar />
          <Box style={{marginTop:"5%"}}>
          <Router  />
          </Box>
        </Block>
      </BrowserRouter>
    </div>
  );
};

export default App;
