const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');

const app = require('./server');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.use(routes);

app.use(errors());
app.use(errorHandler);
