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

const Article = mongoose.model("Article", articleSchema);
//////////////////////////////////Targeting All Articles///////////////////////////////////////////////////////////////////
app
  .route("/articles")
  .get(function (req, res) {
    Article.find({}, function (err, articleResults) {
      if (!err) {
        res.send(articleResults);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    //   console.log(req.body.title);
    //   console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function (err) {
      if (!err) {
        res.send("Successfully saved an article");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Deleted all articles!");
      } else {
        res.send(err);
      }
    });
  });

// app.get("/articles", );
// app.post("/articles", );
// app.delete("/articles", );

//////////////////////////////////Targeting One Specific Articles///////////////////////////////////////////////////////////////////

app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    Article.findOne(
      { title: req.params.articleTitle },
      function (err, articleResult) {
        if (!err) {
          res.send(articleResult);
        } else {
          res.send("No matching Articles");
        }
      }
    );
  })
  .put(function (req, res) {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      {
        title: req.body.title,
        content: req.body.content,
      },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully Updated the article!");
        }
      }
    );
  })
  .patch(function (req, res) {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Succesfully updated the part in article!");
        }
      }
    );
  })
  .delete(function (req, res) {
    Article.findOneAndDelete(
      { title: req.params.articleTitle },
      function (err) {
        if (!err) {
          res.send("Deleted the article successfully");
        }
      }
    );
  });

app.listen(3400, function () {
  console.log("Server started on port 3400");
});
