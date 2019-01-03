const router = require('express').Router();
const offer_processor = require('../utils/offer_processor');
const db = require('../utils/db');
const _ = require('lodash');

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

router.post('/single', async function (req, res, next) {
    try {
        let offers = db.get('offers');

        let search = {'TDU.Name': req.body.tdu_name};


        let filtered_offers = await offers.find(search);
        let result = offer_processor.process_offers(filtered_offers, req.body.usages);
        let filtered = _.filter(result.Results, function (item) {
            return item.Term === 12;
        });
        let lowest = _.min(filtered, function (item) {
            return item.Total;
        });
        res.send(lowest);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;