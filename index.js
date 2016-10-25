// === SETUP ===
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// === ROUTES ===
app.get("/", function(req,res){
  res.render("search");
});

app.get("/results", function(req,res){
  var toSearch = req.query.search;
  //url variable is made to keep the request query managable/shorter
  var url = "http://omdbapi.com/?s=" + toSearch;
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200) {
      var theResponse = JSON.parse(body);
      res.render("results", {data: theResponse});
    }
  });
});


// === SERVER ===
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("MOVIE APP IS UP AND RUNNING!!!");
});