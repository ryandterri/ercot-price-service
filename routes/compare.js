const router = require('express').Router();
const offer_processor = require('../utils/offer_processor');
const db = require('../utils/db');

router.post('/', async function (req, res, next) {
    try {
        let usages = req.body.usages;
        let tdu = req.body.tdu;
        let company = req.body.company;
        let term = req.body.term;

        let offers = db.get('offers');

        let search = {'TDU.Name': tdu.Name};
        if (company) {
            search.Company = company;
        }
        if (term) {
            search.Term = term;
        }
        search.Is_Valid = true;

        let filtered_offers = await offers.find(search);
        let result = offer_processor.process_offers(filtered_offers, usages, tdu);
        res.send(result);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;