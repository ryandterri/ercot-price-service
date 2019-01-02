const router = require('express').Router();
const db = require('../utils/db');

router.get('/', async function (req, res, next) {
    try {
        const offers = db.get('offers');

        let terms = await offers.distinct('Term');
        if (terms) {
            terms.sort(function (a, b) {
                return a - b;
            });
            res.send(terms);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
