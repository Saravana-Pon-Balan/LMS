import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import cookieManager from "../manager/cookieManager"; 
import Code from "./code/code";
import Saved from "./learnComponents/saved";
import Subscribed from "./learnComponents/subscribed";
import CourseList from "./learnComponents/Course/CourseList";
import CourseDetails from "./learnComponents/Course/CourseDetails";
import CourseContent from "./learnComponents/Course/CourseContent";
import CreateCourse from "./learnComponents/Course/CreateCourse";
import CourseCreation from "./learnComponents/Course/CourseCreation";
import Login from "./signup/login";
import SignUp from "./signup/signup";
import Feed from "../socialComp/Home";
import Post from "../socialComp/Post";

import MyCourse from "./mycourse/MyCourse";
import OwnCourse from "./mycourse/OwnCourse";
import Profile from "../User/Profile";
import Chat from "../components/chat/Chat";

const Router = (props) => {
  const  {open, search} = props
  const location = useLocation();
  const [userData, setUserData] = useState(cookieManager.getUserInfo());

  useEffect(() => {
    setUserData(cookieManager.getUserInfo());
  }, [location]);
  console.log(userData);

  return (
    <Routes>
      <Route exact path="/" element={userData ? <CourseList open={open} search={search} userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/playground" element={userData ? <Code userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/saved" element={userData ? <Saved userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/subscribed" element={userData ? <Subscribed userData={userData}/> : <Navigate to="/login" />} />
      
      <Route path="/courses/:id" element={userData ? <CourseDetails userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/createcourse" element={userData ? <CreateCourse userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/coursecreation/:id/:name" element={userData ? <CourseCreation /> : <Navigate to="/login"/>} />
      <Route path="/coursecreation/:id/:name/edit" element={userData ? <CourseCreation /> : <Navigate to="/login"/>} />
      <Route path="/coursecontent/:id" element={userData ? <CourseContent userData={userData} /> : <Navigate to="/login"/>} />
      <Route path="/mylearning" element={userData ? <MyCourse open={open} userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/mycourse" element={userData ? <OwnCourse open={open} userData={userData}/> : <Navigate to="/login"/>} />
      
      
      <Route path="/feed" element={userData ? <Feed userData={userData} /> : <Navigate to="/login"/>} />
      <Route path="/posts/:id" element={userData? <Post userData={userData}/>: <Navigate to="/login"/>}/>
      <Route path="/profile" element={userData? <Profile userData={userData}/>: <Navigate to="/login"/>}/>
      
      <Route path="/message" element={userData? <Chat userData={userData}/>: <Navigate to="/login"/>}/>
      
      
      <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={userData ? <Navigate to="/" /> : <SignUp />} />
      
      
     
    </Routes>
  );
};

export default Router;
