const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
var multer = require('multer');// to upload files and to accept form-data fields
var upload = multer();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
// app.use(upload.single()); //Using this allow us to accept data from form-data, raw and x-www-url-formencoded

// simple route


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ajeet application." });
});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});