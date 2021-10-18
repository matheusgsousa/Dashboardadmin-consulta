const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  medical: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
    default: false,
  },
  pacient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pacient',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
