const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const lists = new Map();

// Route to fetch all list names
app.get("/lists", (req, res) => {
  const listsArray = Array.from(lists.keys());
  res.status(200).json(listsArray);
});

// Route to get a single list by name
app.get("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const list = lists.get(listName);
  if (!list) {
    res.status(404).send("List not found");
  } else {
    res.status(200).json(list);
  }
});

// Route to delete a single list by name
app.delete("/lists/:name", (req, res) => {
  const listName = req.params.name;
  if (!lists.has(listName)) {
    res.status(404).send("List not found");
  } else {
    lists.delete(listName);
    res.status(200).send("List deleted");
  }
});

// Route to add or update a single list
app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const updatedList = req.body;
  if (listName !== updatedList.name) {
    res.status(400).send("List name in URL does not match the body");
  } else if (lists.has(listName)) {
    lists.set(listName, updatedList);
    res.status(200).send("List updated");
  } else {
    lists.set(listName, updatedList);
    res.status(201).send("List created");
  }
});

module.exports = app;
