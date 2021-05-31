const express = require('express');
const config = require('config');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');

const swaggerDocument = YAML.load('./docs/swager.yaml');

const { username, password, host } = config.get('database');
mongoose
    .connect(`mongodb+srv://${username}:${password}@${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => logger.info('MongoDB connection has been established successfully.'))
    .catch( err => {
        logger.error(err);
        process.exit();
    });

app.use(morgan('combined', {stream: logger.stream}));
app.use(express.static('public'));
app.use(bodyParser.json());

// Router.
app.post('/login', require('./auth/login'));
app.use('/person', authenticateJwt, require('./controllers/person/person.routes'));
app.use('/post', authenticateJwt, adminOnly, require('./controllers/post/post.routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use( (err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
