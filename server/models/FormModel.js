const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Folder the form belongs to
    ref: 'Folder',
    required: true,
  },
  elements: [
    {
      type: {
        type: String,
        enum: ['bubble', 'input'],
        required: true,
      },
      content: {
        type: String, 
        required: true,
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String, 
      },
      options: [String], // Only used for 'select' or 'radio' types (not used in the current model, but can be extended if needed)
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    select:false
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    select:false
  },
});

const Form = mongoose.model('Form', FormSchema);
module.exports = Form;
