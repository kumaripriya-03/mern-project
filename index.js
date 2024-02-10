const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/////connection file///////////
require("./db/conn")
/////model connect///////////
var Register=require("./Model/register")
var Admin=require("./Model/adminpanel")

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null,  Math.round(Math.random()*9999)+"-"+file.originalname )
  }
})

const upload = multer({ storage: storage })


//////////admin  register///////////////
app.post('/admregis', upload.single("img"), async (req, res) => {
  //console.log(req.file)
  const { name, email, password, conpassword } = req.body
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const hashConPassword = await bcrypt.hash(conpassword, saltRounds);
  const photo = typeof req.file != 'undefined' ? req.file.filename : null;
  const admin = await Admin({ name, email, password: hashPassword, conpassword: hashConPassword, img: photo });
  let preUser = await Admin.findOne({ email });

  if (!preUser) {
    if (password === conpassword) {
      let result = await admin.save()
      res.send({ message: "Admin Register successfully", result })
    }
    else {
      res.send({ message: "your password and confirm password is not match" })
    }
  }
  else {
    res.send({ message: "ALready exist this mail id in our database" })
  }

})



/////////////Insert or create api///////////
app.post('/register-user', async(req, res)=> {
  const{name,email,password,conpassword,mobile,address}=req.body
  const duplicateEmail= await Register.findOne({email})
  //console.log(duplicateEmail)
  if(!duplicateEmail){
    const passHash=await bcrypt.hash(password,saltRounds);
    const conpassHash=await bcrypt.hash(conpassword,saltRounds)
    const registerData= new Register({name,email,password:passHash,conpassword:conpassHash,mobile,address})
  let result=await registerData.save();
  res.send({message:"Register successfully",result})
  }
  else{
    res.send({message:"Already Register this mail id in our website"})
  }
  
})

////////login-api////////////////////////////

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      const user = await Register.findOne({ email })
      //console.log(user)
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password)
        if ((user.email === email) && isMatch) {
          
          res.send({ "message": "Login Success"})
        } else {
          res.send({  "message": "Email or Password is not Valid" })
        }
      }
       else {
        res.send({ "message": "You are not a Registered User" })
      }
    } 
    else {
      res.send({  "message": "All Fields are Required" })
    }
  } 
  catch (error) {
    console.log(error)
    res.send({ "message": "Unable to Login" })
  }
});



///////////fetch api///////////
app.get("/fetch",async(req,res)=>{
  let result=await Register.find();
  res.send(result)
});

//////delete api/////////////
app.delete("/delete/:id",async(req,res)=>{
  //console.log(req.params.id)
   let result=await Register.deleteOne({_id:req.params.id})
   res.send(result)
});

///////getDeatils api///////////////////////

app.get("/getDetails/:id",async(req,res)=>{
  //console.log(req.params.id)
   let result=await Register.findById({_id:req.params.id})
   res.send(result)
});

////////////update api/////////////////
app.put("/update/:id",async(req,res)=>{
  const{name,email,password,conpassword,mobile,address}=req.body
  const passHash=await bcrypt.hash(password,saltRounds);
  const conpassHash=await bcrypt.hash(conpassword,saltRounds)
     let result=await Register.updateOne({_id:req.params.id},
      {$set:{name,email,password:passHash,conpassword:conpassHash,mobile,address}})
   res.send(result)
});



















app.listen(5000,()=>{
    console.log("App running on port 5000")
    console.log("http://localhost:5000")
})