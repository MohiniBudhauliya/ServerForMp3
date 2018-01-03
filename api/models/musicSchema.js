const mongoose = require('mongoose');
const musicSchema = mongoose.Schema({
  songname: {
    type: String,
    required: true,
    unique :true
  },
  songalbum:{
    type: String,
    required: true
  }

});
const Music = module.exports = mongoose.model('Music', musicSchema);
