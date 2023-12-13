var express = require('express');
var router = express.Router();
var spController= require('../Contronlers/CTL_quanao');
var userController= require('../Contronlers/CTL_quanao');
var adminController=require("../Contronlers/CTl_admin");
var LoginController=require("../Contronlers/CTL_login");
var check_login=require("../middlewares/check_login");

  
// Login

router.get('/admin',check_login.yeu_cau_dang_nhap, function(req, res, next) {
    let uLogin =req.session.userLogin;
    console.log("Thông tin đăng nhập:");
    console.log(req.session.userLogin);
    console.log("+---------------+")
    res.send(uLogin);
  });
router.get('/signin', LoginController.Login2);
router.post('/signin', LoginController.Login2);


module.exports= router;