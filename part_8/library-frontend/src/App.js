import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";

import { BOOK_ADDED } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      if (!data.loading) {
        window.alert(
          `A new book, ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}, was just added!`
        );
      }
    },
  });

  return (
    <div>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommendations />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
