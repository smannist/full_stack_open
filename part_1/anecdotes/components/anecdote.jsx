import React from "react";
import MostVotedAnec from "./mostvotedanec";

const Anecdote = ({ anecdotes, selected, voted }) => (
  <div>
    <h2>
      Anecdote
    </h2>
    <p>
      {anecdotes[selected]}
    </p>
    <p>
      Anecdote has {voted[selected]} votes.
    </p>
    <MostVotedAnec
      anecdotes={anecdotes}
      selected={selected}
      voted={voted}
    />
  </div>
);

export default Anecdote;
