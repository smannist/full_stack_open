import React from "react";

const Anecdote = ({ selected, voted }) => (
  <div>
    <h2>Anecdote</h2>
    <p>Anecdote has {voted[selected]} votes.</p>
  </div>
);

export default Anecdote;
