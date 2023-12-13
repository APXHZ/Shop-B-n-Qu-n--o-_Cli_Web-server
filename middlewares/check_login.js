exports.yeu_cau_dang_nhap = (req, res, next) => {
  if (req.session.userLogin) {
    //đã đăng nhập
    next();
  } else {
    //điều hướng đăng nhập
    res.redirect("/login/signin");
  }
};
