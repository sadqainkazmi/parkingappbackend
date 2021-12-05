const express = require('express'),
    router = express.Router(),
   roleController = require('../controllers/roleController'),
verifyToken = require('../middleware/auth').verifyToken;

// -------------------Queries Routes-------------------------

router.route('/listrole').get((req,res)=>roleController.getallrole(req,res))
router.route('/editrole').post(verifyToken,(req,res)=>roleController.editrole(req,res))
router.route('/createrole').post(verifyToken,(req,res)=>roleController.createrole(req,res))
router.route('/deleterole').post(verifyToken,(req,res)=>roleController.deleterole(req,res))

module.exports = router;