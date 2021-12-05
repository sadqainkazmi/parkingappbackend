const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
verifyToken = require('../middleware/auth').verifyToken;
// -------------------User Routes-------------------------

    router.route('/createuser').post((req,res)=>userController.createUser(req,res))
    router.route('/login').post((req,res)=>userController.login(req,res))
    router.route('/listalluser').get(verifyToken,(req,res)=>userController.listuser(req,res))
    router.route('/getuserbyid').post(verifyToken,(req,res)=>userController.getuserbyid(req,res))
    router.route('/updateuser').post(verifyToken,(req,res)=>userController.updateuser(req,res))
    router.route('/deleteuser').post(verifyToken,(req,res)=>userController.deleteuser(req,res))
    router.route('/canactive').post(verifyToken,(req,res)=>userController.canactive(req,res))
    router.route('/changepassword').post(verifyToken,(req,res)=>userController.changepassword(req,res))
module.exports = router;