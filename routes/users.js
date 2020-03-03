var express = require('express');
var router = express.Router();
var userscontroller=require('../controllers/users.controller');
/* GET users listing. */
router.get('/get', function(req, res, next) {

  
  userscontroller.get(req,res,next);

});

router.get('/get/:_id', function(req, res, next) {

  var _id=req.params._id;
  userscontroller.getById(req,res,_id,next);

});



router.post('/login', function(req, res, next) {

  
  userscontroller.userslogin(req,res,next);

});


router.post('/register', function(req, res, next) {

  
  userscontroller.usersregister(req,res,next);

});

router.patch('/update/:_id', function(req, res, next) {

  var _id=req.params._id;
  userscontroller.usersupdate(req,res,_id,next);

});

router.delete('/delete/:_id', function(req, res, next) {

  var _id=req.params._id;
  userscontroller.usersdelete(req,res,_id,next);

})

module.exports = router;
