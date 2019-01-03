const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_base');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(cors());

app.use('/api', require('./routes/api'));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (err, req, res) {
    console.error(err);
    res.status(500).send('An error has occurred, please bear with us while we look into it');
});

app.listen(process.env.PORT || 3000);