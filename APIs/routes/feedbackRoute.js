const express = require('express'),
    router = express.Router(),
   feedbackController = require('../controllers/feedbackController'),
verifyToken = require('../middleware/auth').verifyToken;

// -------------------Queries Routes-------------------------

router.route('/listfeedbacks').get(verifyToken,(req,res)=>feedbackController.getallfeedback(req,res))
router.route('/reply').post(verifyToken,(req,res)=>feedbackController.replyfeedback(req,res))
router.route('/createfeedback').post(verifyToken,(req,res)=>feedbackController.createfeedback(req,res))
router.route('/deletefeedback').post(verifyToken,(req,res)=>feedbackController.deletefeedback(req,res))

module.exports = router;