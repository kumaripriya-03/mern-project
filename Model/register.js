const mongoose = require('mongoose');
////////create schema/////////////
const registerSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  conpassword:String,
  address:String,
  mobile:Number,
  date: { type: Date, default: Date.now },
  
});

//////creating model/////////////
const Register = mongoose.model('register', registerSchema);
module.exports=Register


