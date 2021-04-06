const express = require('express');
const config = require('./config');

//! если перенести всё в app почему то не слушает сервер, и ошибки не выдаёт
const app = express();

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));

module.exports = app;
