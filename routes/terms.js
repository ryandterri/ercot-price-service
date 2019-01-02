const router = require('express').Router();
const db = require('../utils/db');

router.get('/', function (req, res, next) {

    let offers = db.get('offers');

    offers.distinct('Term')
        .then(function (terms) {
            terms.sort(function (a, b) {
                return a - b;
            });
            res.send(terms);
        })
        .catch(function (err) {
            res.send(err);
        })
        .then(function () {
            db.close();
        });
});

module.exports = router;
