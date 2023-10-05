import React from "react";
import Header from "./header";
import Content from "./content";

const Course = ({ name, parts }) => {
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
    </>
  );
};

export default Course;
