let express = require("express"); 
let mongodb = require("mongodb"); 
let mongoose = require("mongoose");
let db = require("./models");
let logger = require("morgan");
let mongojs = require("mongojs");
let path = require("path");

let app = express(); 
let PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect( process.env.MONGODB_URL || "mongodb://localhost/workout", { useNewUrlParser: true,  useFindAndModify: false });



app.listen(PORT, function() {
  console.log(`App running on http://localhost:${PORT}`)
});