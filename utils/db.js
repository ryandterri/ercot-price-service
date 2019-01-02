const monk = require('monk');
const db = monk(process.env.MONGO_CONN_STRING);

db
    .then(() => {
        console.log('Successfully connected to mongodb server');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = db;