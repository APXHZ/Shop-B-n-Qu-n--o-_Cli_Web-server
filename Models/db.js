const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/QuanAo_01')
         
        .catch( (err)=>{
            console.log('Loi ket Noi CSDL');
            console.log(err);
        });
module.exports={mongoose}