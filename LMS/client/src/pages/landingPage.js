// import {React,useState} from 'react';
// import Sidebar from '../components/Sidebar';
// import Router from "../components/Router";
// import styled from '@emotion/styled';
// import cookieManager from '../manager/cookieManager';


// const Block = styled.div`
//   display:flex;
//   flex-direction:coloumn;
//   background-color:;
// `;
// const Container = styled.div`
//   position:relative;
//   margin-top:5%;
// `

// function Landing(){
//     const [open, setOpen] = useState(false);
//   const userData = cookieManager.getUserInfo();

//   const pull = (data) => {
//     setOpen(data);
//   };
//   return(
//         <Block>
//           <Sidebar  SideBarState={pull} />
//           <Container >
//           <Router  open={open} />
//           </Container>
//         </Block>
//   )
// }
// export default Landing;