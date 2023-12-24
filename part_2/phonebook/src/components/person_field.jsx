import React from "react";

const PersonField = ({ name, number, onChangeName, onChangeNumber }) => {
  return (
    <div>
      <div>
        Name:
        <input value={name} onChange={onChangeName} />
      </div>
      <div>
        Number:
        <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </div>
  );
};

export default PersonField;
