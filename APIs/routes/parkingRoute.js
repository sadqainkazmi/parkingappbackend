const express = require('express'),
    router = express.Router(),
   parkingareaController = require('../controllers/parkingController'),
verifyToken = require('../middleware/auth').verifyToken;

// -------------------Queries Routes-------------------------

router.route('/listparkingareas').get(verifyToken,(req,res)=>parkingareaController.getallareas(req,res))
router.route('/editparkingarea').post(verifyToken,(req,res)=>parkingareaController.editarea(req,res))
router.route('/createparkingarea').post(verifyToken,(req,res)=>parkingareaController.createparkingarea(req,res))
router.route('/deleteparkingarea').post(verifyToken,(req,res)=>parkingareaController.deletearea(req,res))
router.route('/getparkingareaslots').post(verifyToken,(req,res)=>parkingareaController.getslotsbyparkingareaid(req,res))


module.exports = router;