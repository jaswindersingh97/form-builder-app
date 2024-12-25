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
const createform = async(req,res) =>{
    const {userId} = req.user;
    const {name,folder,elements} = req.body;

    const user = await User.findById(userId).populate('sharedDashboards.userId');
    const folderDoc = await Folder.findById(folder);

    if (!folderDoc) {
        return res.status(404).json({ message: 'Folder not found.' });
    }

    // Check if the user is the owner or has edit permission
    const isOwner = folderDoc.userId.equals(userId);
    const hasEditPermission = user.sharedDashboards.some(
        d => d.userId._id.equals(folderDoc.userId) && d.permission === 'edit'
    );

    if (!isOwner && !hasEditPermission) {
        return res.status(403).json({ message: 'You do not have permission to create a form in this folder.' });
    }

    // Create the form
    const newForm = await Form.create({ name, folder, elements });

    // Add the form to the folder
    folderDoc.forms.push(newForm._id);
    await folderDoc.save();

    return res.status(201).json({ message: 'Form created successfully.', form: newForm });

}

const updateForm = async (req, res) => {
    const { userId } = req.user;
    const {formId} = req.params;
    const { name, folder, elements } = req.body;

    // Find the user and folder documents
    const user = await User.findById(userId).populate('sharedDashboards.userId');
    const folderDoc = await Folder.findById(folder);
    const formDoc = await Form.findById(formId);

    if (!folderDoc) {
        return res.status(404).json({ message: 'Folder not found.' });
    }

    if (!formDoc) {
        return res.status(404).json({ message: 'Form not found.' });
    }

    // Check if the user is the owner of the folder or has edit permission
    const isOwner = folderDoc.userId.equals(userId);
    const hasEditPermission = user.sharedDashboards.some(
        (d) => d.userId._id.equals(folderDoc.userId) && d.permission === 'edit'
    );

    if (!isOwner && !hasEditPermission) {
        return res.status(403).json({ message: 'You do not have permission to update the form in this folder.' });
    }

    // Check if the form is in the folder
    if (!folderDoc.forms.includes(formId)) {
        return res.status(400).json({ message: 'Form does not belong to this folder.' });
    }

    // Update the form
    formDoc.name = name || formDoc.name;
    formDoc.folder = folder || formDoc.folder;
    formDoc.elements = elements || formDoc.elements;
    await formDoc.save();

    return res.status(200).json({ message: 'Form updated successfully.', form: formDoc });
};

const deleteForm = async (req, res) => {
    const { userId } = req.user;
    const { formId } = req.params;

    // Find the user and form documents
    const user = await User.findById(userId).populate('sharedDashboards.userId');
    const formDoc = await Form.findById(formId);

    if (!formDoc) {
        return res.status(404).json({ message: 'Form not found.' });
    }

    // Find the folder that contains the form
    const folderDoc = await Folder.findById(formDoc.folder);

    if (!folderDoc) {
        return res.status(404).json({ message: 'Folder not found.' });
    }

    // Check if the user is the owner of the folder or has edit permission
    const isOwner = folderDoc.userId.equals(userId);
    const hasEditPermission = user.sharedDashboards.some(
        (d) => d.userId._id.equals(folderDoc.userId) && d.permission === 'edit'
    );

    if (!isOwner && !hasEditPermission) {
        return res.status(403).json({ message: 'You do not have permission to delete the form in this folder.' });
    }

    // Remove the form from the folder's forms array
    folderDoc.forms = folderDoc.forms.filter(form => form.toString() !== formId);
    await folderDoc.save();

    // Delete the form
    await formDoc.remove();

    return res.status(200).json({ message: 'Form deleted successfully.' });
};

//dashboard routes
const shareDashboard = async(req,res) =>{
    const { userId } = req.user; // Authenticated user's ID
    const { email: targetUserEmail, permission } = req.body;

    // Find the target user by email
    const targetUser = await User.findOne({ email: targetUserEmail });
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure user is not sharing a dashboard with themselves
    if (targetUser._id.toString() === userId) {
      return res.status(400).json({ error: "You cannot share a dashboard with yourself" });
    }

    // Check if the dashboard has already been shared with this user
    const isAlreadyShared = targetUser.sharedDashboards.some(
      (dashboard) => dashboard.userId.toString() === userId
    );

    if (isAlreadyShared) {
      return res.status(400).json({ error: 'Dashboard already shared with this user' });
    }

    // Add the shared dashboard to the target user's sharedDashboards
    targetUser.sharedDashboards.push({
      userId,
      permission,
    });

    // Save the target user
    await targetUser.save();

    return res.status(200).json({ message: 'Dashboard shared successfully' });
}
const createLink = ()=>{

}

const verifyLink =()=>{

}

//User Routes
const getUser = async(req,res) =>{
    const {userId} = req.user;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
}
const searchUser = async(req,res)=>{
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Search query is required." });
    }

    const users = await User.find({ name: { $regex: query, $options: "i" } });
    res.status(200).json(users);
}

module.exports = {
    //settings
    settings:asyncHandler(settings),

    //folder
    getFolders:asyncHandler(getFolders),
    createFolder:asyncHandler(createFolder),
    deleteFolder:asyncHandler(deleteFolder),
    
    //form
    deleteForm:asyncHandler(deleteFolder),
    updateForm:asyncHandler(updateForm),
    createForm:asyncHandler(createform),

    //dashboard
    shareDashboard:asyncHandler(shareDashboard),
    createLink,verifyLink,

    //User
    getUser: asyncHandler(getUser),
    searchUser:asyncHandler(searchUser)

}