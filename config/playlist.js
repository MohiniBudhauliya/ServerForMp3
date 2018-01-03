const express = require('express');
const router = express.Router();

const  musiclist=require('../api/models/musicSchema');

//retrieving music list
router.get('/playlist', function (req, res, next) {
  musiclist.find(function (err,musicSchema) {
    res.json(musicSchema);
  });

});


module.exports = router;
