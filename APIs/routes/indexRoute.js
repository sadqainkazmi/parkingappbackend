let express = require('express'),
    router  = express.Router();
 
    
router.use('/user', require('./userRoute'));
router.use('/role', require('./roleRoute'));
router.use('/parkingarea', require('./parkingRoute'));
router.use('/feedback', require('./feedbackRoute'));
router.use('/booking', require('./bookingslotRoute'));






router.get('*', (req, res) => res.status(200).send({
  message: '...:::::::___-___working parking app__as__indexed inside APIs___-___:::::::...',
}));
module.exports = router;
