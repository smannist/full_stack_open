import React from "react";

const FilterField = ({ value, onChange }) => {
  return (
    <div>
      Name:
      <input value={value} onChange={onChange} />
    </div>
  )
}

export default FilterField;
