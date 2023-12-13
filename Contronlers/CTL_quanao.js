var Model = require("../Models/DB_Quan_Ao");

exports.getinfo_SP = (req, res, next) => {
  res.render("San_pham/sp_home");
};


exports.search = async (req, res, next) => {
  let listSize = await Model.SizeSanphamModel.find();
  let listTrangthai= await Model.TrangthaiSanphamModel.find();
  let listTheloai= await Model.TheloaiSanphamModel.find();
  
  let dieu_kien = {};
  if(typeof(req.query.TenSP )!= 'undefined'){
      dieu_kien.TenSP = new RegExp(req.query.TenSP, 'i'); // 'i' là không phân biệt hoa thường
  }
  var list = await Model.SanphamModel.find(dieu_kien)
    .populate("Theloai")
    .populate("Size")
    .populate("Trangthai");
  console.log("================Tim Kiem==================")
  console.log("Số sản phẩm phù hợp: "+list.length );
  console.log(list);
  console.log("================Tim Kiem END==================")
  res.render("San_pham/sp_home", { sanphammoles: list, listTL: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
};



// const unidecode = require('unidecode');
// // ... (các import và khai báo khác)
// exports.search = async (req, res, next) => {
//   try {
//     let listSize = await Model.SizeSanphamModel.find();
//     let listTrangthai = await Model.TrangthaiSanphamModel.find();
//     let listTheloai = await Model.TheloaiSanphamModel.find();
//     let dieu_kien = {};
//     if (typeof (req.query.TenSP) != 'undefined') {
//       let TenSP_khongdau = unidecode(req.query.TenSP);
//       let regex = new RegExp(`.*${TenSP_khongdau}.*`, 'i');
//       dieu_kien = { 'TenSP': regex };
//     }
//     var list = await Model.SanphamModel.find(dieu_kien)
//       .populate("Theloai")
//       .populate("Size")
//       .populate("Trangthai");
//     console.log("================Tim Kiem==================")
//     console.log("Số lượng sản phẩm phù hợp: " + list.length);
//     console.log(list);
//     console.log("================Tim Kiem END==================")
//     res.render("San_pham/sp_home", { sanphammoles: list, listTL: listSize, listTrangthai: listTrangthai, listTheloai: listTheloai });
//   } catch (error) {
//     console.error("Lỗi khi tìm kiếm sản phẩm:", error);
//     res.status(500).send("Có lỗi xảy ra khi tìm kiếm sản phẩm.");
//   }
// };










exports.listQuan_Ao = async (req, res, next) => {
  let listSize = await Model.SizeSanphamModel.find();
  let listTrangthai= await Model.TrangthaiSanphamModel.find();
  let listTheloai= await Model.TheloaiSanphamModel.find();
  let list = await Model.SanphamModel.find()
    .populate("Theloai")
    .populate("Size")
    .populate("Trangthai");
  console.log(list);

  res.render("San_pham/sp_home", { sanphammoles: list, listTL: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
};
// exports.them_quanao = async (req, res, next) => {
//   let msg = '';
//   let listSize = await Model.SizeSanphamModel.find();
//   let listTrangthai= await Model.TrangthaiSanphamModel.find();
//   let listTheloai= await Model.TheloaiSanphamModel.find();
//   if(req.method =='POST'){
//     // kiểm tra hợp lệ dữ liệu nếu có....
//  let objKho = new Model.SanPham_KhoModel();
//     objKho.Soluong = req.body.Soluong; // Giả sử bạn đã gửi số lượng qua req.body.Soluong
//     let new_kho = await objKho.save();

//     // Tạo một sản phẩm mới với ObjectId của bản ghi kho mới
//     let objSP = new Model.SanphamModel();
//     objSP.TenSP = req.body.TenSP;
//     objSP.Giatien = req.body.Giatien;
//     objSP.Thongtin = req.body.Thongtin;
//     objSP.Hinhanh=req.body.Hinhanh;
//     objSP.Theloai=req.body.Theloai;
//     objSP.Size=req.body.Size;
//     objSP.Soluong=new_kho._id;
//     // ghi vào CSDL
//     try {
//         let new_sp = await (objSP.save());
//         console.log(new_sp);
//         msg = 'Thêm mới thành công';
//         res.redirect('/quanao/sanpham');
//     } catch (error) {
//         msg = 'Lỗi '+ error.message;
//         console.log(error);
//     }
// }

// res.render("Admin/ad_them", {msg:msg, listSize: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
// };
exports.them_quanao = async (req, res, next) => {
  let msg = '';
  let listSize = await Model.SizeSanphamModel.find();
  let listTrangthai= await Model.TrangthaiSanphamModel.find();
  let listTheloai= await Model.TheloaiSanphamModel.find();

  if(req.method =='POST'){
    // Tạo một sản phẩm mới
    let objSP = new Model.SanphamModel();
    objSP.TenSP = req.body.TenSP;
    objSP.Giatien = req.body.Giatien;
    objSP.Thongtin = req.body.Thongtin;
    objSP.Hinhanh=req.body.Hinhanh;
    objSP.Theloai=req.body.Theloai;
    objSP.Size=req.body.Size;

    // Lưu sản phẩm mới và lấy ObjectId của nó
    let new_sp = await objSP.save();

    // Tạo một bản ghi mới trong bảng SanPham_Kho với số lượng bạn muốn
    let objKho = new Model.TrangthaiSanphamModel();
    objKho.TenSP = new_sp._id; // Sử dụng ObjectId của sản phẩm mới
    objKho.Soluong = req.body.Soluong; // Giả sử bạn đã gửi số lượng qua req.body.Soluong
    objKho.Trangthai = req.body.Trangthai;

    // Lưu bản ghi kho mới
    let new_kho = await objKho.save();

    // Cập nhật sản phẩm mới với ObjectId của bản ghi kho mới
    new_sp.Soluong = new_kho._id;
    new_sp.Trangthai = new_kho._id;
    await new_sp.save();

    try {
        console.log(new_sp);
        msg = 'Thêm mới thành công';
        res.redirect('/product');
    } catch (error) {
        msg = 'Lỗi '+ error.message;
        console.log(error);
    }
  }

  res.render("Admin/ad_them", {msg:msg, listSize: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
};

exports.sua_quanao = async (req, res, next) => {
  let msg = '';
  let listSize = await Model.SizeSanphamModel.find();
  let listTrangthai= await Model.TrangthaiSanphamModel.find();
  let listTheloai= await Model.TheloaiSanphamModel.find();

  let objSP = await Model.SanphamModel.findById(req.query.id).populate('Soluong');
  if (!objSP) {
    msg = 'Không tìm thấy sản phẩm';
    return res.render("Admin/ad_sua", {msg:msg, listSize: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
  }

  if(req.method =='POST'){
    objSP.TenSP = req.body.TenSP;
    objSP.Giatien = req.body.Giatien;
    objSP.Thongtin = req.body.Thongtin;
    objSP.Hinhanh=req.body.Hinhanh;
    objSP.Theloai=req.body.Theloai;
    objSP.Size=req.body.Size;

    let objKho = await Model.TrangthaiSanphamModel.findById(objSP.Soluong._id);
    objKho.Soluong = req.body.Soluong; // Giả sử bạn đã gửi số lượng qua req.body.Soluong
    objKho.Trangthai = req.body.Trangthai;

    // Lưu bản ghi kho mới
    await objKho.save();

    // Cập nhật sản phẩm mới với ObjectId của bản ghi kho mới
    await objSP.save();

    try {
        console.log(objSP);
        msg = 'Cập nhật thành công';
        res.redirect('/Product');
    } catch (error) {
        msg = 'Lỗi '+ error.message;
        console.log(error);
    }
  }

  res.render("Admin/ad_sua", {msg:msg, listSize: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai, objSP: objSP });
};

// exports.chitiet_sanpham = async (req, res, next) => {
//   let id = req.params.id;
//   let objSP = await Model.SanphamModel.findById(id).populate('Soluong');

//   if (!objSP) {
//     return res.status(404).send('Không tìm thấy sản phẩm');
//   }

//   res.render('chitiet_sanpham', { objSP: objSP });
// };

exports.chitiet_sanpham = async (req, res, next) => {
  let id = req.params.id; // Lấy ID sản phẩm từ params
  let objSP = await Model.SanphamModel.findById(id)
  .populate('Soluong')
  .populate('Trangthai')
  .populate('Theloai')
  .populate('Size');; // Tìm sản phẩm trong cơ sở dữ liệu

  if (!objSP) {
    return res.status(404).send('Không tìm thấy sản phẩm'); // Nếu không tìm thấy sản phẩm, gửi lại thông báo lỗi 404
  }

  if (req.method == 'POST') {
    // Nếu yêu cầu là POST, cập nhật thông tin sản phẩm
    objSP.TenSP = req.body.TenSP;
    objSP.Giatien = req.body.Giatien;
    objSP.Thongtin = req.body.Thongtin;
    objSP.Hinhanh = req.body.Hinhanh;
    objSP.Theloai = req.body.Theloai;
    objSP.Size = req.body.Size;
    objSP._id = id;

    let objKho = await Model.TrangthaiSanphamModel.findById(objSP.Soluong._id);
    objKho.Soluong = req.body.Soluong;
    objKho.Trangthai = req.body.Trangthai;

    // Lưu bản ghi kho mới
    await objKho.save();

    // Cập nhật sản phẩm mới với ObjectId của bản ghi kho mới
    await objSP.save();
  }
  console.log(objSP);

  res.render("Nguoi_dung/nd_chitiet", { objSP: objSP }); // Render view với thông tin sản phẩm
};



exports.orderForm = (req, res, next) => {
  res.render('/Nguoi_dung/nd_dathang');
};

exports.placeOrder = async (req, res, next) => {
  let orderDetails = req.body;
  // Lưu thông tin đặt hàng vào cơ sở dữ liệu
  // ...
  res.send('Đặt hàng thành công!');
  res.render('/Nguoi_dung/nd_dathang');
};
