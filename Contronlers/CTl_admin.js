var Model = require("../Models/DB_Quan_Ao");


exports.listQuan_Ao_AD = async (req, res, next) => {
  let listSize = await Model.SizeSanphamModel.find();
  let listTrangthai= await Model.TrangthaiSanphamModel.find();
  let listTheloai= await Model.TheloaiSanphamModel.find();
  let list = await Model.SanphamModel.find()
    .populate("Theloai")
    .populate("Size")
    .populate("Trangthai");
  console.log(list);

  res.render("Admin/ad_home", { sanphammoles: list, listTL: listSize, listTrangthai:listTrangthai, listTheloai:listTheloai });
};

// exports.listDonHang_AD = async (req, res, next) => {
//   let listUser= await Model.userModel.find();
//   let listSanpham= await Model.SanphamModel.find();
//   let listDonHang = await Model.DonHangModel.find()
//     .populate("Tenhang").populate("Tenuser").populate("email").populate("Diachi").populate("Sdt");
//   console.log(listDonHang)
//   res.render("Admin/ad_donhang", { donhang: listDonHang,listUser:listUser,listSanpham:listSanpham });
// };

exports.listDonHang_AD = async (req, res, next) => {
  let listDonHang = await Model.DonHangModel.find()
    .populate("Tenhang")
    .populate("Tenuser")
    .populate("email")
    .populate("Diachi")
    .populate("Sdt");

  console.log(listDonHang)
  res.render("Admin/ad_donhang", { donhang: listDonHang });
};


exports.xacNhanDonHang_AD = async (req, res, next) => {
  let donHangId = req.params.id;

  await Model.DonHangModel.updateOne({ _id: donHangId }, { Xacnhan: true });

  res.redirect('Admin/ad_infohang');
};

exports.getProduct = (req, res, next) => {









    res.render("Admin/ad_home");
  };