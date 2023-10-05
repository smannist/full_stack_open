import React from "react";
import Part from "./part";

const Content = ({ courses }) => {
  const getParts = courses.parts.map((course) => (
    <Part key={course.id} course={course} />
  ));

  return <div>{getParts}</div>;
};

export default Content;
