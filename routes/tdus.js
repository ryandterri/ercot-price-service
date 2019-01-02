const router = require('express').Router();
const db = require('../utils/db');

router.get('/', function(req, res, next) {
    let tdus = db.get('tdus');

    tdus.find({})
        .then(function(tdu_list) {
            res.send(tdu_list);
        })
        .catch(function(err) {
            res.send(err);
        })
        .then(function(){
            db.close();
        });
});

module.exports = router;
