const mongoose = require('mongoose');
const Folder = require('./FolderModel');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder', 
      },
    ],
    sharedDashboards: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
          },
          permission: {
            type: String,
            enum: ['view', 'edit'], 
            required: true,
          },
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

  userSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const defaultFolder = await Folder.create({
          name: 'Default',
          userId: this._id,
        });
        this.folders.push(defaultFolder._id); // Add the default folder to user's folders
      } catch (err) {
        return next(err);
      }
    }
    next();
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;