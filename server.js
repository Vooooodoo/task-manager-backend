const express = require('express');
const config = require('./config');

//! if replace to the App don't listen the server & no errors
const app = express();

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));

module.exports = app;
