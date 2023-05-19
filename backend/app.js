const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// route imports
const product = require("./routes/productRoute");

app.use("/api/v1",product);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;