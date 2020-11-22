const express = require('express');
const fs = require('fs');
const path = require('path');

// initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// set up data parser 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname));

// set up listener
app.listen(PORT, function () {
    console.log('App is listening on PORT: ' + PORT);
});