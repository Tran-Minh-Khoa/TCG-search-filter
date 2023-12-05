const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    series: { type: String, required: true },
  });

const Set = mongoose.model('Set', setSchema);
module.exports = Set;