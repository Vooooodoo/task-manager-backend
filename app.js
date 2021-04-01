const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const app = require('./server');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(routes);

app.use(errors());
app.use(errorHandler);
