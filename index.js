const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_base');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT);