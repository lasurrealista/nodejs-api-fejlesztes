const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use('/person', require('./controllers/person/routes'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
