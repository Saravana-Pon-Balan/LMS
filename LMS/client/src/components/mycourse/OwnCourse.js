import React, { useEffect, useState } from 'react';
import axios from "axios";
import CourseListPage from '../../pages/course/CourseListPage';

const OwnCourse = (props) =>{
    const {userData,open} = props;
    const [courses, setCourses] = useState([]);
    console.log(courses)
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.post("http://localhost:3001/get_my_own_course",{email:userData});
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourse();
  }, []); 

  return (
    <CourseListPage open={open} course={courses} creator={true}/>
  );

}

export default OwnCourse;