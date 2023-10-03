import React from "react";

const MostVotedAnec = ({ anecdotes, voted }) => {
  const maxVotes = Math.max(...voted);
  const indexOfMaxVotes = voted.indexOf(maxVotes);

  if (maxVotes === 0) {
    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <p>No votes have been cast yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMaxVotes]}</p>
      <p>Has {maxVotes} votes</p>
    </div>
  );
};

export default MostVotedAnec;
