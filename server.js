// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const checkValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// handle empty query
app.get("/api/timestamp", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const { date_string } = req.params;
  const date = new Date(date_string);

  const isValidDate = checkValidDate(date);
  if (parseInt(date_string) > 10000) {
    unixTime = new Date(parseInt(date_string));
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }

  if (isValidDate) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
