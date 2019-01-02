const router = require('express').Router();
const db = require('../utils/db');

router.get('/', async function (req, res, next) {
    try {
        const offers = db.get('offers');

        let companies = await offers.distinct('Company');
        if (companies) {
            res.send(companies);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
