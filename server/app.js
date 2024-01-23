// app.js
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Your routes and server logic go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
