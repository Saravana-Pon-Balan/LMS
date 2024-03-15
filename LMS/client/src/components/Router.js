// router.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import cookieManager from "../manager/cookieManager"; 
import Code from "./learnComponents/code/code";
import Saved from "./learnComponents/saved";
import Subscribed from "./learnComponents/subscribed";
import CourseList from "./learnComponents/Course/CourseList";
import CourseDetails from "./learnComponents/Course/CourseDetails";
import CourseContent from "./learnComponents/Course/CourseContent";
import CreateCourse from "./learnComponents/Course/CreateCourse";
import CourseCreation from "./learnComponents/Course/CourseCreation";
import Login from "./signup/login";
import SignUp from "./signup/signup";

const Router = ({ open }) => {
  const userData = cookieManager.getUserInfo();

  return (
    <Routes>
      
      <Route
        path="/playground"
        element={userData ? <Code /> : <Navigate to="/login" />}
      />
      <Route
        path="/saved"
        element={userData ? <Saved /> : <Navigate to="/login" />}
      />
      <Route
        path="/subscribed"
        element={userData ? <Subscribed /> : <Navigate to="/login" />}
      />
      <Route
        path="/courses/:id"
        element={userData ? <CourseDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/courses/:id/:name"
        element={userData ? <CourseContent open={open} /> : <Navigate to="/login" />}
      />
      <Route
        path="/createcourse"
        element={userData ? <CreateCourse /> : <Navigate to="/login" />}
      />
      <Route
        path="/coursecreation/:id/:name"
        element={userData ? <CourseCreation /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={userData ? <Navigate to="/" /> : <SignUp />} />
      <Route
        path="/"
        element={userData ? <CourseList /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default Router;
