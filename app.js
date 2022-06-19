const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.Model("Article", articleSchema);

app.get("/", function(req, res) {
    Article.find({}, function(err, articleResult) {
        console.log(articleResult);
    });
});

app.listen(3400, function () {
  console.log("Server started on port 3400");
Article