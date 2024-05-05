import React, { useEffect, useState } from 'react';
import axios from "axios";
import CourseListPage from '../../../pages/course/CourseListPage';

const CourseList = (props) => {
  const { open, search, userData } = props;
  const [courses, setCourses] = useState([]);
  const [recommended, setRecommended] = useState([])
  console.log(recommended)
  useEffect(()=>{
    const getRecommendation = async()=>{
      await axios.post("http://localhost:3001/get_recommend",{
        email:userData
      })
      .then((res)=>{
        setRecommended(res.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    getRecommendation()
  },[])

  useEffect(() => {
    const getCourse = async () => {
      try {
        console.log(search)
        if(search == ""){
          const response = await axios.get(`http://localhost:3001/course`);
          setCourses(response.data);
          search = ""

        }
        else{
        const response = await axios.get(`http://localhost:3001/course/${search}`);
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
    <CourseListPage open={open} course={courses} recommended={recommended} />
  );
};

export default CourseList;