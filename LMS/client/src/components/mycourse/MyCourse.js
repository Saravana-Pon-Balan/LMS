import React, { useEffect, useState } from 'react';
import axios from "axios";
import CourseListPage from '../../pages/course/CourseListPage';

const MyCourse = (props) =>{
    const {userData,open} = props;
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        console.log(userData.email);
        const response = await axios.post("http://localhost:3001/get_my_course",{email:userData});
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourse();
  }, []); 

  return (
    <CourseListPage open={open} course={courses}/>
  );

}

export default MyCourse;