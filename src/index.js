const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./config/logger');

const port = 3000;

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
