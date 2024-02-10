const mongoose = require('mongoose');
///////define schema///////////////
const adminSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  conpassword:{type:String},
  img:String,
  date: { type: Date, default: Date.now }
});

////////create model////////////
module.exports=mongoose.model("Admins",adminSchema)