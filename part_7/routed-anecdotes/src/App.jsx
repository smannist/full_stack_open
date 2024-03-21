import { useState } from "react";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Footer from "./components/Footer";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const initialAnecdotes = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const match = useMatch("/anecdotes/:id");

  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`Added ${anecdote.content} by ${anecdote.author}!`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<AnecdoteForm addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
