// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// var fs = require("fs");
var db = require("./db.json");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use("/assets", express.static("./assets/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
app.get("/api/notes", function (req, res) {
  res.json(db);
});
app.post("/api/notes", function (req, res) {
  db.push(req.body);
  res.json(db);
});
// app.delete("/api/notes/:id", function (req, res) {
//   // Should receive a query parameter containing the id of a note to delete.
//   // you'll need to find a way to give each note a unique `id` when it's saved.
//   // In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property
//   // then rewrite the notes to the`db.json` file
// });

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
