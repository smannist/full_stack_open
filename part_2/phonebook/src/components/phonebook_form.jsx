import React from "react";
import FilterField from "./filter_field";
import PersonField from "./person_field";

const PhonebookForm = ({ name, number, filter, filterChange, nameChange, numberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <h4>Filter name</h4>

      <FilterField value={filter} onChange={filterChange} />

      <h4>Add new</h4>

      <PersonField
        name={name}
        number={number}
        onChangeName={nameChange}
        onChangeNumber={numberChange}
      />
    </form>
  );
};

export default PhonebookForm;
