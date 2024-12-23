const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId, // References Form documents
      ref: 'Form',
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
},{
  timestamps: true
});
const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;
