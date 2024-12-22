const mongoose = require('mongoose');

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
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true
  });
const User = mongoose.model('User', userSchema);

module.exports = User;