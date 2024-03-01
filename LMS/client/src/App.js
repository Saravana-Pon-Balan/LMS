import React, { useState } from 'react';
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
const Container = styled.div`
  position:relative;
  margin-top:5%;
`
const App = () => {
  const [open,setOpen] = useState(false);
  const pull = (data)=>{
    console.log(data)
    setOpen(data)
  }
  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <Block>
          <Sidebar SideBarState={pull} />
          <Container >
          <Router  open={open} />
          </Container>
        </Block>
      </BrowserRouter>
    </Box>
  );
};

export default App;
