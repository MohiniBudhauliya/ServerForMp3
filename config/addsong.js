const express = require('express');
const router = express.Router();

const musiclist = require('../api/models/musicSchema');

//Adding to music list
router.post('/addsong', function (req, res, next) {
  var newMusiclist = new musiclist({
    songname: req.body.songname,
    songalbum: req.body.songalbum
  });
  newMusiclist.save(function (err, musicSchema) {
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      console.log(err);
      res.status(500).send(JSON.stringify( {found : "Song not added"}));
      //res.json({msg: 'Failed to add to Musiclist'});
    }
    else {
      res.status(200).send(JSON.stringify( {found : "Song added"}));
      //res.json({msg: 'Added successfully'});
    }
  });
});

module.exports = router;
