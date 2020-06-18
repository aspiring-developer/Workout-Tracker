let express = require("express");
let mongodb = require("mongodb");
let mongoose = require("mongoose");
let db = require("./models");
let logger = require("morgan");
let mongojs = require("mongojs");
let path = require("path");

let app = express();
let PORT = process.env.PORT || 5000;

app.use(logger("dev"));

// required if using static contents (html, css, images)
app.use(express.static("public"));

//required if using req.body object
app.use(express.urlencoded({ extended: true }));   let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/heroku_8fr0pjng";
 mongoose.connect(MONGODB_URI);

 app.get("/api/workouts", function (req, res) {
  db.Workout.find({}).then(function (data) {
    res.json(data);
  })
});

// routing to the workout UI dashboard
app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
});

// routing to the fitness tracker UI where users can interact with the app
app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.put("/api/workouts/:id", function (req, res) {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body }
    }).then(function (data) {
      res.json(data);
    })
});

app.get("/api/workouts/range", function (req, res) {
  db.Workout.find({}).then(function (data) {
    res.json(data);
  })
});

app.post("/api/workouts", function ({ body }, res) {
  db.Workout.create(body).then(function (data) {
    res.json(data);
  })
});

app.get("all", function (req, res) {
  db.Workout.find({}), (function (error, data) {
    if (error) {
      res.send(error)
    } else {
      res.json(data);
    }
  })
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`App running on http://localhost:${PORT}`)
});

