const mongoose = require('mongoose');

const Taskschema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    default: null
  },
  mistakes: {
    type: Number,
    default: 0,
    required: false
  },
  status: {
    type: String,
    default: "Not Completed",
    required: false
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userss',
    required: true
  }
}, { timestamps: true });

const Task = mongoose.model('Task', Taskschema);

module.exports = Task;
