const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: false,
  },
  componentsLink: {
    type: String,
    required: false,
  },
  images: [{
    type: String, 
  }],
  stepInputs: [{
    type: String, 
  }],
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
