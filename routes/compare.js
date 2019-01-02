const router = require('express').Router();
const offer_processor = require('../utils/offer_processor');
const db = require('../utils/db');

router.post('/', async function (req, res, next) {
    try {
        let offers = db.get('offers');

        let search = {'TDU.Name': req.body.tdu_name};
        if (req.body.company_name) {
            search.Company = req.body.company_name;
        }
        if (req.body.term) {
            search.Term = req.body.term;
        }
        search.Is_Valid = true;

        let filtered_offers = await offers.find(search);
        if (filtered_offers && filtered_offers.length) {
            let result = offer_processor.process_offers(filtered_offers, req.body.usages);
            res.send(result);
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