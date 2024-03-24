const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require('cors');
const express = require('express');
const path = require("path");

const configureExpressApp = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(compression(9));
    app.use(cors());

    // Serve static files from the specified directory
    const staticFilesDirectory = path.join(__dirname, "..", "app", "Controller", "Course");
    console.log(staticFilesDirectory)
    app.use(express.static(staticFilesDirectory));
};

module.exports = configureExpressApp;
