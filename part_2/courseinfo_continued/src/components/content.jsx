import React from "react";
import Part from "./part";
import Total from "./total";

const Content = ({ parts }) => {
  const getParts = parts.map((course) => (
    <Part key={course.id} course={course} />
  ));

  return (
    <div>
      {getParts}
      <Total parts={parts} />
    </div>
  );
};

export default Content;
