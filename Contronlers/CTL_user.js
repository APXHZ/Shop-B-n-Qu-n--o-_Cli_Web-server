var Model = require("../Models/DB_Quan_Ao");


exports.getinfo_ND = (req, res, next) => {
    res.render("Nguoi_dung/nd_home");
  };

//user
exports.userInfo = async (req, res, next) => {
    let user = await Model.userModel.findById(req.params.id);
  
    if (!user) {
      return res.status(404).send('Không tìm thấy người dùng');
    }
  
    res.render('/Nguoi_dung/nd_info', { user: user });
  };