const express = require('express');
const router = express.Router();

const musiclist = require('../api/models/musicSchema');

//Deleting from music list
router.post('/removesong', function (req, res, next) {
  var songname=req.body.songname;
  musiclist.findOne({songname : songname},function (err,result) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    else {
      musiclist.remove({songname: songname}, function (err, result) {
        if (err) {
          res.json(err);
        }
        else {
          res.status(200).send(JSON.stringify( {found : "Song Removed"}));
        }
      });
    }
  });
});
module.exports = router;
