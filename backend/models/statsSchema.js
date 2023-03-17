const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  count_valid:{
        type: Number,
        required: true
  },
  count_invalid:{
    type: Number,
    required: true
  },
  ratio:{
    type: Number,
    required: true
  }
});

const stats = mongoose.model('stats', statsSchema);

module.exports = stats;
