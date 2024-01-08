const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get(process.env.PERSONS_API_URL, (request, response) => {
  response.json(persons);
});

app.get(`${process.env.PERSONS_API_URL}/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }

});

app.delete(`${process.env.PERSONS_API_URL}/:id`, (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get(process.env.INFO_API_URL, (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people.</p>
     <p>${date}.</p>`
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
