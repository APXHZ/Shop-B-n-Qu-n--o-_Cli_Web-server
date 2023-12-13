var express = require('express');
var router = express.Router();
var spController= require('../Contronlers/CTL_quanao');
var userController= require('../Contronlers/CTL_quanao');
var adminController=require("../Contronlers/CTl_admin");
var LoginController=require("../Contronlers/CTL_login");
var check_login=require("../middlewares/check_login");

// Kiểm tra quyền hạn 
// function requireAdmin(req, res, next) {
//     // Kiểm tra xem người dùng đã đăng nhập chưa
//     if (!req.session.userLogin) {
//       return res.redirect('/login/signin');
//     }
//     // Kiểm tra xem người dùng có phải là admin không
//     if (req.session.userLogin['role '] !== 2) {
//       return res.send('Bạn không đủ quyền hạn');
//     }
//     // Nếu người dùng đã đăng nhập và là admin, tiếp tục xử lý yêu cầu
//     next();
//   }
function requireAdmin(req, res, next) {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.userLogin) {
      return res.redirect('/login/signin');
    }
    // Kiểm tra xem người dùng có phải là admin không
    if (req.session.userLogin['role '] === 1) {
      res.redirect('/product');
      return next();
    } else if (req.session.userLogin['role '] === 2) {
      return next();
    } else {
      return res.send('Bạn không đủ quyền hạn');
    }
}


router.get('/home',requireAdmin, spController.search);

// Dành cho ADMIN
router.get('/home',requireAdmin, adminController.listQuan_Ao_AD);

router.get('/them',requireAdmin, spController.them_quanao);
router.post('/them',requireAdmin, spController.them_quanao);

router.get('/sua',requireAdmin, spController.sua_quanao);
router.post('/sua',requireAdmin, spController.sua_quanao);

router.get('/donhang',requireAdmin, adminController.listDonHang_AD);
router.post('/donhang/:id/xacnhan',requireAdmin, adminController.xacNhanDonHang_AD);



module.exports= router;