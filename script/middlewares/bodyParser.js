const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
