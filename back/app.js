const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
var cors = require("cors");
// Lancement de l'application
app.listen(port, () => {
  console.log(`Todolist at http://localhost:${port}`);
});

//MIDDLEWARE
var Chefing = function (req, res, next) {
   if (!req.get("chefing")) {
    return res.json({ error: "Chefing header didn't found" });
  } 
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// MongoDB & Schema
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
mongoose.connect("mongodb://localhost/todo", { useNewUrlParser: true });

const db = mongoose.connection;
autoIncrement.initialize(db);

db.once("open", function () {
  console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));

const todoSchema = new mongoose.Schema({
  tache: String,
  state: { type: Boolean, default: false },
});

todoSchema.plugin(autoIncrement.plugin, "Todo");

var Todo = mongoose.model("Todo", todoSchema);

// Route

app.post("/api/create",Chefing, (req, res) => {
  var Task = Todo({ tache: req.body.task, state: false });
  Task.save(function (err) {
    if (err) {
      return status(500).json({ error: err });
    } else {
      res.status(200).json({ success: "Tache ajouter" });
    }
  });
});

app.post("/api/get",Chefing, (req, res) => {
  Todo.find({}, function (err, result) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

app.post("/api/delete", (req, res) => {
  Todo.deleteOne({ _id: req.body.taskId }, function (err) {
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json({ success: "Tache supprimé" });
    }
  });
});

app.post("/api/update", (req, res) => {
  Todo.updateOne({ _id: req.body.taskId }, { state: true }, function (err) {
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json({ success: "Tache supprimé" });
    }
  });
});
