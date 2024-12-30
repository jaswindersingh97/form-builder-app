const mongoose = require('mongoose');

const FieldDataSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true, 
  },
  value: {
    type: String,
    required: true,
  },
});

const SubmissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  data: [FieldDataSchema],
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
