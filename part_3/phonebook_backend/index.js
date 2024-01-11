const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { unknownEndpoint, internalServerError, badRequest, errorHandler } = require("./middleware/person");
const { PORT } = require("./config"); 
require("dotenv").config();

morgan.token("body", (request, response) => JSON.stringify(request.body));

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Person
    .find({})
    .then((notes) => {
      response.json(notes);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person
    .findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
  })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
})

app.get("/info", async (request, response) => {
  const date = new Date();

  try {
    const count = await Person.countDocuments({});
    response.send(
      `<p>Phonebook has info for ${count} people.</p>
       <p>${date}.</p>`
    );
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(unknownEndpoint);
app.use(internalServerError);
app.use(badRequest);
app.use(errorHandler);
