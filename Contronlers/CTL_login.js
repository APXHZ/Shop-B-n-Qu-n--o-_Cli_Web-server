var Model = require("../Models/DB_Quan_Ao");


// check user và admin 
exports.changeRole = async (req, res, next) => {
    let user = await Model.userModel.findById(req.params.id);
  
    if (!user) {
      return res.status(404).send('Không tìm thấy người dùng');
    }
  
    user.role = 2;
    await user.save();
  
    res.send('Đã thay đổi vai trò của người dùng thành admin');
  };

// login
exports.login = function(req, res) {
    const { username, passwd } = req.body;
    User.findOne({ username, passwd }, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else if (!user) {
            res.status(401).send('Tên đăng nhập hoặc mật khẩu không đúng');
        } else {
            res.status(200).send('Đăng nhập thành công');
        }
    });
    res.render('/Nguoi_dung/nd_info', { user: user });
  };  

exports.Login2 = async (req, res, next) => {
    let msg = '';
    if (req.method == "POST") {
      // Lấy thông tin user
      try {
        let objU = await (Model.userModel.findOne({ username: req.body.username }));
        console.log(objU);
        if (objU != null) {
          // Có tồn tại user
          if (objU.passwd == req.body.passwd) {
            // Đúng passwd
            req.session.userLogin = objU;
            msg = 'Đăng nhập thành công!';
            // Kiểm tra role của người dùng
            if (objU.role['role '] !== 2) {
              // Nếu role là 2, chuyển hướng người dùng đến trang admin
              return res.redirect('/admin/home');
            } else 
          //  if(objU.role['role '] !== 1)
             {
              // Nếu không, chuyển hướng người dùng đến trang sản phẩm
              return res.redirect('/product');
            }
          } else {
            // Sai passwd
            msg = 'Sai mật khẩu!';
          }
        } else {
          // Không tồn tại user
          msg = 'Không tồn tại user ' + req.body.username;
        }
      } catch (error) {
        msg = error.message;
      }
    }
    res.render('Trang_chu/Login', { msg: msg });
}

// Check login
exports.displayUserInfo = async (req, res, next) => {
    let user;
    // Nếu có id được cung cấp, cố gắng lấy thông tin người dùng từ cơ sở dữ liệu
    if (req.params.id) {
      user = await Model.userModel.findById(req.params.id);
    }
    // Nếu không tìm thấy người dùng trong cơ sở dữ liệu, sử dụng thông tin người dùng từ session
    if (!user) {
      user = req.session.userLogin;
    }
    // Nếu vẫn không tìm thấy người dùng, trả về lỗi
    if (!user) {
      return res.status(404).send('Không tìm thấy người dùng');
    }
    // Hiển thị thông tin người dùng
    res.render("Trang_chu/info", { user: user });
  };
  