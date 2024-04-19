import React, { useEffect, useState } from 'react';
import axios from "axios";
import CourseListPage from '../../../pages/course/CourseListPage';

const CourseList = (props) => {
  const {open} = props;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourse();
  }, []); 

  return (
    <CourseListPage open={open} course={courses} />
  );
};

export default CourseList;
