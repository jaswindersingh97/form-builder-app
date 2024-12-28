const mongoose = require('mongoose');

// Schema for tracking form progress (started, completed, and view counts)
const ProgressTrackingSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true, 
  },
  viewCount: {
    type: Number,
    default: 0, 
  },
  startedCount: {
    type: Number,
    default: 0, 
  },
  completedCount: {
    type: Number,
    default: 0,
  },
});

const ProgressTracking = mongoose.model('ProgressTracking', ProgressTrackingSchema);

module.exports = ProgressTracking;
