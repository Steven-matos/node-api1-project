const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [];

server.post("/api/users", (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (userData.name || userData.bio) {
    userData.id = shortid.generate();
    users.push(userData);
    res.status(201).json(userData);
  } else if (null) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  }
});

server.get("/api/users", (req, res) => {
  if (!users) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved."
    });
  } else {
    res.status(200).json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (id) {
    const user = users.filter(user => id === user.id);
    res.status(200).json(user);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} ** \n`)
);
