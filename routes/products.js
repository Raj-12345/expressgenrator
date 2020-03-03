var express = require('express');
var router = express.Router();
var productscontroller=require('../controllers/products.controller');
/* GET users listing. */
router.get('/get', function(req, res, next) {

  
  productscontroller.get(req,res,next);

});

router.get('/get/:_id', function(req, res, next) {

  var _id=req.params._id;
  productscontroller.getById(req,res,_id,next);

});


router.post('/store', function(req, res, next) {

  
  productscontroller.productsstore(req,res,next);

});


router.patch('/update/:_id', function(req, res, next) {

  var _id=req.params._id;
  productscontroller.productsupdate(req,res,_id,next);

});


router.delete('/delete/:_id', function(req, res, next) {

  var _id=req.params._id;
  productscontroller.productsdelete(req,res,_id,next);

})

module.exports = router;
