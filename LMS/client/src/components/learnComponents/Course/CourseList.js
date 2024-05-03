import React, { useEffect, useState } from 'react';
import axios from "axios";
import CourseListPage from '../../../pages/course/CourseListPage';

const CourseList = (props) => {
  const { open, search } = props;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        console.log(search)
        if(search == ""){
          const response = await axios.get(`http://localhost:3001`);
          setCourses(response.data);
          search = ""

        }
        else{
        const response = await axios.get(`http://localhost:3001/${search}`);
        setCourses(response.data);
        search = ""
        }
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
