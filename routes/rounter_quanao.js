var express = require('express');
var router = express.Router();
var spController= require('../Contronlers/CTL_quanao');

router.get('/nguoidung', spController.getinfo_ND);
router.get('/sanpham', spController.listQuan_Ao);
//router.get('/', spController.getinfo);

router.get('/admin', spController.them_quanao);
router.post('/admin', spController.them_quanao);

module.exports= router;