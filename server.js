// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// var fs = require("fs");
var db = require("./db.json");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

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
app.delete("/api/notes/:id", function (req, res) {
  let noteId = req.params.id;
  let removeI;
  for (let i = 0; i < db.length; i++) {
    if (db[i].id === noteId) {
      removeI = i;
    }
  }
  db.splice(removeI, 1);
  res.json(db);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
