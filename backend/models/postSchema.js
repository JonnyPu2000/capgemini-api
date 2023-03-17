const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  letters: {
    type: [String]
  },
  is_valid: {
    type: Boolean,
    required: false,
}
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
