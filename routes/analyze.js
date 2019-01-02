const router = require('express').Router();
const offer_processor = require('../utils/offer_processor');
const db = require('../utils/db');

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;

        let offers = db.get('offers');

        let search = {
            'TDU.Name': body.tdu_name,
            Company: body.company_name,
            Name: body.product_name
        };

        let offer = await offers.findOne(search);
        if (offer) {

            let result = {
                usages: [],
                costs: [],
                pkwh: []
            };

            for (let i = 300; i <= 3700; i += 100) {
                result.usages.push(i + ' kWh');
                let cost = offer_processor.get_usage_cost(offer, i, offer.TDU);
                result.costs.push(cost);
                let pkw_cost = Math.round(cost / i * 100 * 100) / 100;
                result.pkwh.push(pkw_cost);
            }
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
