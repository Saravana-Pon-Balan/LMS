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
import MyCourse from "./mycourse/MyCourse";
import OwnCourse from "./mycourse/OwnCourse";

const Router = (props) => {
  const  {open} = props
  const location = useLocation();
  const [userData, setUserData] = useState(cookieManager.getUserInfo());

  useEffect(() => {
    setUserData(cookieManager.getUserInfo());
  }, [location]);
  console.log(userData);

  return (
    <Routes>
      <Route exact path="/" element={userData ? <CourseList open={open}/> : <Navigate to="/login"/>} />
      <Route path="/playground" element={userData ? <Code userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/saved" element={userData ? <Saved userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/subscribed" element={userData ? <Subscribed userData={userData}/> : <Navigate to="/login" />} />
      <Route path="/courses/:id" element={userData ? <CourseDetails userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/createcourse" element={userData ? <CreateCourse userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/coursecreation/:id/:name" element={userData ? <CourseCreation /> : <Navigate to="/login"/>} />
      <Route path="/coursecreation/:id/:name/edit" element={userData ? <CourseCreation /> : <Navigate to="/login"/>} />
      <Route path="/coursecontent/:id" element={userData ? <CourseContent /> : <Navigate to="/login"/>} />
      <Route path="/mylearning" element={userData ? <MyCourse open={open} userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/mycourse" element={userData ? <OwnCourse open={open} userData={userData}/> : <Navigate to="/login"/>} />
      <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={userData ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/feed" element={userData ? <Feed /> : <Navigate to="/login"/>} />
    </Routes>
  );
};

export default Router;
