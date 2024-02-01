import { Route, Routes } from "react-router-dom";
import Course from "./learnComponents/Course";
import Code from "./learnComponents/code";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/playground" element={<Code />} />
      </Routes>
  );
};

export default Router;
