const router = require('express').Router();
const db = require('../utils/db');

router.get('/', function(req, res, next) {
    let offers = db.get('offers');

    offers.distinct('Company')
        .then(function(companies) {
            res.send(companies);
        })
        .catch(function(err) {
            res.send(err);
        });
});

module.exports = router;
