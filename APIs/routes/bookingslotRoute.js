const express = require('express'),
    router = express.Router(),
   bookingController = require('../controllers/bookedslotController'),
verifyToken = require('../middleware/auth').verifyToken;

// -------------------Queries Routes-------------------------

router.route('/listbooking').get(verifyToken,(req,res)=>bookingController.getallbooking(req,res))
router.route('/createbooking').post(verifyToken,(req,res)=>bookingController.createbooking(req,res))
router.route('/deletebooking').post(verifyToken,(req,res)=>bookingController.deletebooking(req,res))

module.exports = router;