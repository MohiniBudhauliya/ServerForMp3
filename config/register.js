//importing modules
var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var user=require('../api/models/userSchema');


router.post('/register',function (req,res) {

  var newuser=new user({
    username:req.body.username,
    useremail:req.body.useremail,
    userpassword:req.body.userpassword,
    userdob:req.body.userdob
  });
  newuser.save(function(err,loggeduser) {
    res.setHeader('Content-Type', 'application/json');
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    else {
      return res.status(200).send(JSON.stringify({found: "Record saved"}));

    }
  });
});

module.exports=router;
