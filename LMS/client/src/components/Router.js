import React from "react";
import { Route, Routes } from "react-router-dom";
import Code from "./learnComponents/code/code";
import Saved from "./learnComponents/saved";
import Subscribed from "./learnComponents/subscribed";
import CourseList from "./learnComponents/Course/CourseList";
import CourseDetails from "./learnComponents/Course/CourseDetails";
import CourseContent from "./learnComponents/Course/CourseContent";
import CreateCourse from "./learnComponents/Course/CreateCourse";
import CourseCreation from "./learnComponents/Course/CourseCreation"
import Login from "./signup/login";
import SignUp from "./signup/SignupPage";
const Router = (props) => {
  const {open} = props;
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/playground" element={<Code />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/subscribed" element={<Subscribed />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/courses/:id/:name" element={<CourseContent open={open}/>}/>
      <Route path="/createcourse" element={<CreateCourse/>} />
      <Route path="/coursecreation/:id/:name" element={<CourseCreation/>} />

    </Routes>
  );
};

export default Router;
