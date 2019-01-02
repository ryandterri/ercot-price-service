const router = require('express').Router();
const offer_processor = require('../utils/offer_processor');
const db = require('../utils/db');

router.post('/', function(req, res, next) {
    let request = req.body.request;

    let offers = db.get('offers');

    let search = {
        'TDU.Name': request.TDU.Name,
        Company: request.Company,
        Name: request.Name
    };

    offers.findOne(search)
        .then(function(offer) {
            let result = {
                usages: [],
                costs: [],
                pkwh: []
            };

            for (let i = 300; i <= 3700; i += 100) {
                result.usages.push(i + ' kWh');
                let cost = offer_processor.get_usage_cost(offer, i, request.TDU);
                result.costs.push(cost);
                let pkw_cost = Math.round(cost / i * 100 * 100) / 100;
                result.pkwh.push(pkw_cost);
            }
            res.send(result);
        })
        .catch(function(err) {
            res.send(err);
        });
});

module.exports = router;
