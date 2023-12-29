import React from "react";

const Person = ({ name, number, id, remove }) => {
  const handleRemoveClick = () => {
    remove(id, name);
  };

  return (
    <div>
      <li>
        {name} {number}
        <button onClick={handleRemoveClick}>delete</button>
      </li>
    </div>
  );
};

export default Person;
