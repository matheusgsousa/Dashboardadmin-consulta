const mongoose = require('../../database');

const PacientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

 

const Pacient = mongoose.model('Pacient', PacientSchema);

module.exports = Pacient;
