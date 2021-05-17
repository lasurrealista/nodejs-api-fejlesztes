require('dotenv').config();
const config = require('config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./config/logger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;

// Database connection.
if (!config.has('database')) {
    logger.error('Ne database config found.');
    process.exit();
}
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
app.use('/person', require('./controllers/person/routes'));

app.use( (err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
