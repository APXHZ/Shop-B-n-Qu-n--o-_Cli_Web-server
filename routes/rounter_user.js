var express = require('express');
var router = express.Router();
var spController= require('../Contronlers/CTL_quanao');
var userController= require('../Contronlers/CTL_quanao');
var adminController=require("../Contronlers/CTl_admin");
var LoginController=require("../Contronlers/CTL_login");
var check_login=require("../middlewares/check_login");

// Kiểm tra quyền hạn 
function requireAdmin(req, res, next) {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.userLogin) {
      return res.redirect('/quanao/login');
    }
    // Kiểm tra xem người dùng có phải là admin không
    if (req.session.userLogin['role '] !== 2) {
      return res.send('Bạn không đủ quyền hạn');
    }
    // Nếu người dùng đã đăng nhập và là admin, tiếp tục xử lý yêu cầu
    next();
  }

// Kiểm tra đăng nhập  
  function requireLogin(req, res, next) {
    if (!req.session.userLogin) {
      // Nếu người dùng chưa đăng nhập, chuyển hướng họ đến trang đăng nhập
      return res.redirect('/login/signin');
    }
    // Nếu người dùng đã đăng nhập, tiếp tục xử lý yêu cầu
    next();
  }


router.get('/info/:id?', requireLogin, LoginController.displayUserInfo);


//router.get('/nguoidung', spController.getinfo_ND);

module.exports= router;