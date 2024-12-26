const mongoose = require('mongoose');

// Schema for storing field data in a submission
const FieldDataSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true, // Match the label in the Form model's elements
  },
  value: {
    type: String, // Value associated with the field
    required: true,
  },
});

// Schema for submissions
const SubmissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true, // Reference to the Form being submitted
  },
  submittedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the submission occurred
  },
  data: [FieldDataSchema], // Array of submitted field data
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
