import { Route, Routes } from "react-router-dom";
import Code from "./learnComponents/code";
import Saved from "./learnComponents/saved";
import Subscribed from "./learnComponents/subscribed";
import CourseList from "./learnComponents/Course/CourseList";
import courses from "./learnComponents/Course/Courses";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<CourseList courses={courses} />} />  
        <Route path="/playground" element={<Code />} />
        <Route path="/saved" element={<Saved/>} />
        <Route path="/subscribed" element={<Subscribed />} />

      </Routes>
  );
};

export default Router;
