import React, { useEffect, useState } from 'react';
import axios from "axios";
import CourseListPage from '../../../pages/course/CourseListPage';

const CourseList = (props) => {
  const { open, search } = props;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${search}`);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourse();
  }, [search]);

  return (
    <CourseListPage open={open} course={courses} />
  );
};

export default CourseList;
