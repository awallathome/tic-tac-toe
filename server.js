const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv/config');

app.use(bodyParser.json());

const routes = require('./routes/TicTacToe');
app.use('/', routes);

const options =  { 
  useNewUrlParser: true,
  useUnifiedTopology: true  
}

mongoose.connect(process.env.unPw, options, () => {
  })
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch(err => {
    console.error("Problem connecting to MongoDB");
  });

const PORT = 7000;
app.listen(PORT, () => {
  console.log("App is listening to port: ", PORT);
});
