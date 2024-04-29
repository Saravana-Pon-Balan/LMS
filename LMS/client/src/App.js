
import {React,useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Router from "./components/Router";
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import cookieManager from './manager/cookieManager';
import Chat from './components/chatbot/chatbot';
const Block = styled.div`
  display:flex;
  flex-direction:coloumn;
  background-color:;
`;
const Container = styled.div`
  position:relative;
  margin-top:5%;
`
const ChatDiv = styled.div`
  position:absolute;
`
const App = () => {
  
  const [open, setOpen] = useState(false);
  const userData = cookieManager.getUserInfo();
  const [chatBotState, setChatbotState] = useState(false);
  const [searchState, setSearchState] = useState();
  const pullChatBotState = (data)=>{
    setChatbotState(data);
  };
  const pullSearchState = (data)=>{
    console.log(data)
    setSearchState(data)
  };
  const pull = (data) => {
    setOpen(data);
  };
  console.log(chatBotState);
  
  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
      {userData?(
        <Block>
          <Sidebar SideBarState={pull} chatBot={pullChatBotState} searchClick={pullSearchState}/>
          <Container >
          {chatBotState&&<Chat style={{"z-index":"1"}}/>}
          <Router  open={open} search = {searchState}/>
          </Container>
        </Block>
      ):
      (
        <Block>
        <Container >
        {chatBotState&&<ChatDiv/>}
        <Router  open={open} />
        </Container>
      </Block>
      )}
      </BrowserRouter>
    </Box>
  );
};

export default App;