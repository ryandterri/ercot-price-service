const router = require('express').Router();

router.use('/compare', require('./compare'));

module.exports = router;