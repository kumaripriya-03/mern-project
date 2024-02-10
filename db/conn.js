const mongoose = require('mongoose');
const dbName="mern12"
mongoose.connect('mongodb://127.0.0.1:27017/'+dbName)
.then(()=>console.log("mongodb is connected to Node"))
.catch(()=>console.log("Not connected to mongoDB"))