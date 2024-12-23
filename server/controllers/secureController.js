const asyncHandler = require('./../utils/asyncHandler');
const User = require('./../models/UserModel');
const Folder = require('./../models/FolderModel');
const Form = require('./../models/FormModel')
const bcrypt = require('bcrypt')
//settings Route
const settings = async(req,res) =>{
    const { userId } = req.user;
    const { name, email, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId).select('+password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    if (newPassword) {
        if (!oldPassword) {
            return res.status(400).json({ message: 'Old password is required to set a new password' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        updates.password = await bcrypt.hash(newPassword,10);
    }

    if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(userId, updates, { new: true });
    }

    return res.status(200).json({ message: 'Settings updated successfully' });
}

//folder Routes
const getFolders = async(req,res) =>{
    const { userId } = req.user;

    // Fetch user and folders
    const user = await User.findById(userId).populate({
        path: 'folders',
        populate: {
            path: 'forms',
        },
    });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    return res.status(200).json({ folders: user.folders });
}

const createFolder = async(req,res) =>{
    const {userId} = req.user;
    const {name} = req.body;

    const user = await User.findById(userId).populate('folders');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const folderExists = user.folders.some(folder => folder.name === name);
    if (folderExists) {
        return res.status(400).json({ message: 'A folder with this name already exists.' });
    }

    const folder = new Folder({
        name,
        userId,
    });

    await folder.save();

    user.folders.push(folder._id);
    await user.save();

    return res.status(201).json({ message: 'Folder created successfully.', folder });
}

const  deleteFolder = async(req,res) =>{
    const {userId} = req.user;
    const {folderId} = req.params;

    const folder = await Folder.findById(folderId);
    if (!folder) {
        return res.status(404).json({ message: 'Folder not found.' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const isFolderOwner = folder.userId.toString() === userId;
    const hasEditRights = user.sharedDashboards.some(shared => 
        shared.dashboardId.toString() === folder.userId.toString() && shared.permission === 'edit'
    );

    if (!isFolderOwner && !hasEditRights) {
        return res.status(403).json({ message: 'You do not have permission to delete this folder.' });
    }

    if (folder.name == 'Default') {
        return res.status(400).json({ message: 'The default folder cannot be deleted.' });
    }

    await Form.deleteMany({ folder: folder._id });

    await Folder.findByIdAndDelete(folderId);

    await User.findByIdAndUpdate(userId, { $pull: { folders: folderId } });

    return res.status(200).json({ message: 'Folder deleted successfully.' });
}

//form Routes
const createform = () =>{

}
const updateform = () =>{

}

const deleteform = ()=>{

}
module.exports = {
    //settings
    settings:asyncHandler(settings),

    //folder
    getFolders:asyncHandler(getFolders),
    createFolder:asyncHandler(createFolder),
    deleteFolder:asyncHandler(deleteFolder),
    
    //form
    deleteform,updateform,createform,
}