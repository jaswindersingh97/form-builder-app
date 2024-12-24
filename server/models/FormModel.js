const mongoose = require('mongoose');

// Schema for ButtonValues
const ButtonValueSchema = new mongoose.Schema({
  id: {
    type: String, // UUID
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Schema for Elements
const ElementSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  superType: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Text', 'Image', 'Video', 'Gif', 'Number', 'Email', 'Phone', 'Date', 'Rating', 'Buttons'], // Valid types
  },
  value: {
    type: String,
    default: '', // Default empty value for fields
  },
  buttonValues: [ButtonValueSchema], // Included only if type is 'Buttons'
});

// Schema for the Form
const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name of the form
  },
  folder: {
    type: String,
    default: '', // Folder name, if applicable
  },
  elements: [ElementSchema], // Array of form elements
});

// Creating the Form model
const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
