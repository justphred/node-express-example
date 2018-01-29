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


// https://help.github.com/articles/connecting-to-github-with-ssh/


// Heroku node.js example demo url:  https://floating-scrubland-82548.herokuapp.com/ deployed to Heroku
// Heoku commands:
// heroku ps  - view number of dyno "engines" that are running your app - scale
// heroku ps:scale web=0 - scale your app dyno's running on server down to zero e.g. turn it off.
// heroku logs --tail  - get a look at the stuff logged by your app
// heroku logs --ps web.1 --tail - view only events logged by the web.1 dyno
// heroku local        - start a local instance of a heroku hosted app.
// git push heroku master  -  push changes made locally to heroku git repository.
// heroku addons:create papertrail  -  add to my heroku deployment the Papertrail logging service
//                                     Papertrail is an addon to a Heroku deployment
// heroku addons:open papertrail  - opens a console in Web browser showing log(s) for your app.
// heroku addons  - provides a list of addons currently associated with a deployment
// heroku run bash  - start up a console running bash shell on your deployed app's dyno
// heroku run node  - starut up a console running a node.js instance on your remote app dyno.
// heroku config:set [environment variable]
//     heroku config:set TIMES=2  - set the TIMES environment vareiable on a deployed app dyno
// heroku config  -  display config vars that are set on deployed app dyno
// heroku releases  -  displayes a listing (audit train) of "versions" of an app deployed on heroku
    // $ heroku releases
    // === floating-scrubland-82548 Releases - Current: v5
    // v5  Set TIMES config va…   splatmakle@gmail.com  2018/01/28 17:38:23 -0500 (~ 18m ago)
    // v4  Deploy c7b100a9        splatmakle@gmail.com  2018/01/28 16:55:50 -0500 (~ 1h ago)
    // v3  Deploy 787a0397        splatmakle@gmail.com  2018/01/28 16:00:07 -0500 (~ 1h ago)
    // v2  Enable Logplex         splatmakle@gmail.com  2018/01/28 15:58:58 -0500 (~ 1h ago)
    // v1  Initial release        splatmakle@gmail.com  2018/01/28 15:58:58 -0500 (~ 1h ago)
// heroku releases:rollback v3  - will rollback the running dyno to the previous release.



















//asdf
