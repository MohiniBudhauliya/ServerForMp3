var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var user=require('../api/models/userSchema');

router.post('/login',function (req,res) {
  user.findOne({useremail:req.body.useremail,userpassword:req.body.userpassword},function (err,user) {
    res.setHeader('Content-Type', 'application/json');
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    if(!user)
    {
      return res.status(404).send(JSON.stringify({result:"Record not found"}));
    }
    return res.status(200).send(JSON.stringify({ result : "Record Found"}));
  });
});
module.exports=router;
