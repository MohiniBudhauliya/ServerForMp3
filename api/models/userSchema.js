const mongoose=require('mongoose');
const userSchema=mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  useremail:{
    type:String,
    required:true,
    unique:true
  },
  userpassword:{
    type:String,
    required:true
  },
  userdob:{
    type:String,
    required:true
  }
});

const userData=mongoose.model('userData',userSchema);
module.exports=userData;
