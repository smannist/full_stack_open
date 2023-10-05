import React from "react";
import Header from "./header";
import Content from "./content";

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content courses={course} />
    </>
  )
}

export default Course
