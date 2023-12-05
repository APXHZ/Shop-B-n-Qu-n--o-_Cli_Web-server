var Model = require("../Models/DB_Quan_Ao");


exports.getinfo_ND = (req, res, next) => {
  res.render("Nguoi_dung/nd_home");
};

exports.getinfo_SP = (req, res, next) => {
  res.render("San_pham/sp_home");
};

// exports.getinfo_TC = (req, res, next) => {
//   res.render("San_pham/sp_home");
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
        res.redirect('/quanao/sanpham');
    } catch (error) {
        msg = 'Lỗi '+ error.message;
        console.log(error);
    }
  }

  res.render("Admin/ad_them", {msg:msg, listSize: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
};

