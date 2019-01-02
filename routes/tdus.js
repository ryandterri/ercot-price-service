const router = require('express').Router();
const db = require('../utils/db');

router.get('/', async function (req, res, next) {
    try {
        const tdus = db.get('tdus');

        let tdu_list = await tdus.distinct('Name');
        if (tdu_list) {
            res.send(tdu_list);
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
