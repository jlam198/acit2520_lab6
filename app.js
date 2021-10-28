/*
 Authors:
 Your name and student #: Jeremy Lam A01253371
 Your Partner's Name and student #: N/A
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let movielist = req.body.movies.trim().split(",")
  res.render("pages/index", { movielist : movielist })
});

app.get("/myListQueryString", (req, res) => {
  let movielist = [req.query.movie1, req.query.movie2]
  res.render("pages/index", { movielist : movielist })
});

app.get("/search/:movieName", (req, res) => {
  let movName = req.params.movieName;

  fs.readFile("./movieDescriptions.txt", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        const desclist = data.toString().split("\n");
        //res.send(movName)
        res.render("pages/searchResult", { desc : desclist, movName : movName })
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});