const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4005;

//settings
// app.set("port", 3000);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use(require("./routes"));

//static files
app.use(
  express.static(path.join(__dirname, "public"), {
    etag: false,
    maxAge: "1y",
  })
);

//listening the server
app.listen(PORT);
