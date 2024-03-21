// router.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

const Router = ({ open }) => {
  var userData=""
  useEffect(()=>{
    userData = cookieManager.getUserInfo();
    console.log(userData)
  })
  
  return (
    <Routes>
      <Route
        exact path="/"
        element={ <CourseList />}
      />
      <Route
        path="/playground"
        element={<Code />}
      />
      <Route
        path="/saved"
        element={ <Saved /> }
      />
      <Route
        path="/subscribed"
        element={<Navigate to="/login" />}
      />
      <Route
        path="/courses/:id"
        element={<CourseDetails />}
      />
     
      <Route
        path="/createcourse"
        element={<CreateCourse />}
      />
      <Route
        path="/coursecreation/:id/:name"
        element={<CourseCreation />}
      />
      <Route
        path="/coursecontent/:id"
        element={<CourseContent />}
      />
      <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={userData ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/feed" element={<Feed/>} />
    </Routes>
  );
};

export default Router;
