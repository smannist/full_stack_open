const Anecdote = ({ anecdote }) => {
  const style = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const titleStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const infoStyle = {
    marginBottom: "5px",
  };

  return (
    <div style={style}>
      <h3 style={titleStyle}>{anecdote.content}</h3>
      <p style={infoStyle}>Author: {anecdote.author}</p>
      <p style={infoStyle}>Url: {anecdote.info}</p>
      <p style={infoStyle}>Votes: {anecdote.votes}</p>
    </div>
  );
};

export default Anecdote;