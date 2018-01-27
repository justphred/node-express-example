const express = require("express");
const hbs = require("hbs"); // Handlebars view engine for express
const fs = require("fs");

var app = express();


hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// Logging function MIDDLEWARE
app.use((req, res, next) => {
  var now = new Date().toString();
  var logMsg = `${now}: ${req.method} ${req.url}`;

  console.log(logMsg);
  fs.appendFile("server.log", logMsg + "\n", (err) => {
    if (err) {
      console.log("Unable to append to server.log :: " + err);
    }
  });

  next();
});

// app.use((req, res, next) => {
//     // console.log("Here'm I am");
//     res.render("maintenance.hbs", {pageTitle: "Maintanance In Progress"} );
//     //next();
// });

app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   // res.send("<h1>Hello Cruel Worlds !</h1>");
//   res.send({name: "Alice",
//             likes: ["tea","rabits","Jaberwokies"]});
// });
app.get("/", (req, res) => {
  res.render("home.hbs",
    {
      pageMessage: "Welcome To Our Humble Home",
      pageTitle: "This Is The Homeboy Page",
      // currentYear: new Date().getFullYear()
    });
});

app.get("/about", (req, res) => {
  res.render("about.hbs",
    {
      pageTitle: "This Is The About Page",
      // currentYear: new Date().getFullYear()
    });
});


app.get("/bad", (req, res) => {
  // res.send("<h1>Bad request ... could not find that page!</h1>");
  res.send({errorMessage: "Error: Unable to handle request!"});
});

app.listen(3000, () => {console.log("Express is Listening on port 3000")});
