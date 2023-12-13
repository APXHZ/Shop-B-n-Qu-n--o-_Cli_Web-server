var express = require('express');
var router = express.Router();
var spController= require('../Contronlers/CTL_quanao');
var userController= require('../Contronlers/CTL_quanao');
var adminController=require("../Contronlers/CTl_admin");
var check_login=require("../middlewares/check_login");



router.get('/', spController.search); 
router.get('/', spController.listQuan_Ao);

//router.get('/Product/:id', spController.chitiet_sanpham);

router.get('/sanpham', spController.chitiet_sanpham);
router.get('/sanpham/:id', spController.chitiet_sanpham);


router.get('/quanao/order', spController.orderForm);
router.post('/quanao/order', spController.placeOrder);



module.exports= router;