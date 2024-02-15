import React from "react";
import { Route, Routes } from "react-router-dom";
import Code from "./learnComponents/code/code";
import Saved from "./learnComponents/saved";
import Subscribed from "./learnComponents/subscribed";
import CourseList from "./learnComponents/Course/CourseList";
import CourseDetails from "./learnComponents/Course/CourseDetails";
import CourseContent from "./learnComponents/Course/CourseContent";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/playground" element={<Code />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/subscribed" element={<Subscribed />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/courses/:id/:name" element={<CourseContent/>}/>
    </Routes>
  );
};

export default Router;
