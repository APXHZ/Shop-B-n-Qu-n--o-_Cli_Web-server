var db = require("./db");
var userSchema = new db.mongoose.Schema(
  {
    username: { type: String, require: true },
    passwd: { type: String, require: true },
    Tenuser:{type:String,require:false},
    email: { type: String, require: false },
    Diachi: { type: String, require: false },
    Sdt: { type: Number, require: false },
    role : { type: Number, require: true, default:1 }, // Mặc định role 1 là người dùng 
  },
  {
    collection: "User",
  }
);
let User = db.mongoose.model("User", userSchema);

let userModel = db.mongoose.model("userModel", userSchema);

var sanphamSchema = new db.mongoose.Schema(
  {
    TenSP: { type: String, require: true },
    Giatien: { type: Number, require: false },
    Thongtin: { type: String, require: false },
    Hinhanh: { type: String, require: false },
    Theloai: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "TheloaiSanphamModel",require:false
    },
    Size: { type: db.mongoose.Schema.Types.ObjectId, ref: "SizeSanphamModel",require:false},
    Soluong: { type: db.mongoose.Schema.Types.ObjectId, ref: "TrangthaiSanphamModel",require:false},
    //Trangthai:{ type: String, require: false },
    Trangthai: { type: db.mongoose.Schema.Types.ObjectId, ref: "TrangthaiSanphamModel",require:false },
  },
  {
    collection: "SanPham_Quanao",
  }
);
let SanphamModel = db.mongoose.model("SanphamModel", sanphamSchema);

var TheloaiSchema = new db.mongoose.Schema(
  {
    TenTheloai: { type: String, require: true },
  },
  {
    collation: { locale: 'en_US', strength: 1 },
    collection: "SanPham_TheLoai",
  }
);
let TheloaiSanphamModel = db.mongoose.model(
  "TheloaiSanphamModel",
  TheloaiSchema
);

var SizeSchema = new db.mongoose.Schema(
  {
    Tensize: { type: String, require: true },
  },
  {
    collation: { locale: 'en_US', strength: 1 },
    collection: "SanPham_Size",
  }
);
let SizeSanphamModel = db.mongoose.model("SizeSanphamModel", SizeSchema);

var TrangthaiSanphamSchema = new db.mongoose.Schema(
  {
    TenSP: { type: db.mongoose.Schema.Types.ObjectId, ref: "SanphamModel" },
    Trangthai:{type:String,require:false},
    Soluong:{type:Number,require:true},
  },
  {
    collation: { locale: 'en_US', strength: 1 },
    collection: "SanPham_Kho",
  }
);
TrangthaiSanphamSchema.pre('save', function(next) {
  if (this.Soluong === 0) {
    this.Trangthai = 'Hết hàng';
  } else {
    this.Trangthai = 'Còn hàng';
  }
  next();
});


let TrangthaiSanphamModel = db.mongoose.model("TrangthaiSanphamModel", TrangthaiSanphamSchema);

var DonHangSchema = new db.mongoose.Schema(
  {
    Tenuser: { type: db.mongoose.Schema.Types.ObjectId, ref: "userModel" },
    email: { type: db.mongoose.Schema.Types.ObjectId, ref: "userModel" },
    Diachi: { type: db.mongoose.Schema.Types.ObjectId, ref: "userModel" },
    Sdt: { type: db.mongoose.Schema.Types.ObjectId, ref: "userModel" },
    Soluonghang: { type: Number, require: true },
    Tenhang: { type: db.mongoose.Schema.Types.ObjectId, ref: "SanphamModel" },
    Xacnhan: { type: Boolean, default: false }
  },
  {
    collation: { locale: 'en_US', strength: 1 },
    collection: "SanPham_DatHang",
  }
);

let DonHangModel = db.mongoose.model("DonHangModel", DonHangSchema);




module.exports = {
  userModel,
  SanphamModel,
  TheloaiSanphamModel,
  SizeSanphamModel,
  TrangthaiSanphamModel,
  DonHangModel,


  User
};
