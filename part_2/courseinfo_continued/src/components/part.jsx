import React from "react";

const Part = ({ course }) => {
  return (
    <p>
      {course.name} {course.exercises}
    </p>
  )
}

export default Part
