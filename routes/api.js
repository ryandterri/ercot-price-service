const router = require('express').Router();

router.use('/analyze', require('./analyze'));
router.use('/companies', require('./companies'));
router.use('/compare', require('./compare'));
router.use('/tdus', require('./tdus'));
router.use('/terms', require('./terms'));

module.exports = router;