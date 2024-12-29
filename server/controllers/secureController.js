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
const getFoldersUserBased = async (req, res) => {
    const { userId } = req.user;
    const { targetId } = req.params;

    // Fetch the current logged-in user to verify access
    const currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).json({ message: 'User not found.' });

    // Check if the targetId is the current user or part of dashboardShared
    if (
        targetId !== userId &&
        !currentUser.sharedDashboards.some(
          (dashboard) => dashboard.userId.toString() === targetId
        )
      )  {
        return res.status(403).json({ message: 'Access denied.' , currentUser, targetId });
    }

    // Fetch the target user's folders and populate forms
    const targetUser = await User.findById(targetId).populate({
        path: 'folders',
        populate: {
            path: 'forms',
        },
    });
    if (!targetUser) return res.status(404).json({ message: 'Target user not found.' });

    return res.status(200).json({ folders: targetUser.folders });
};

const createFolder = async (req, res) => {
    const { userId: loggedInUserId } = req.user;  // The logged-in user's ID
    const { name } = req.body;  // Target user ID (if provided)
    const { userId : targetUserId} = req.params;
    const targetUser = await User.findById(targetUserId || loggedInUserId).populate('sharedDashboards folders');
    if (!targetUser) return res.status(404).json({ message: 'Target user not found.' });

    // Check if a folder with the same name already exists for the target user
    const folderExists = targetUser.folders.some(folder => folder.name === name);
    if (folderExists) {
        return res.status(400).json({ message: 'A folder with this name already exists.' });
    }

    const currentUser = await User.findById(loggedInUserId)

    // Check if the logged-in user has permission (owner or editor) for the target user
    const isOwner = targetUser._id.equals(loggedInUserId);
    const hasEditPermission = currentUser.sharedDashboards.some(
        (d) => d.userId.toString() === targetUserId && d.permission === 'edit'
    );

    if (!isOwner && !hasEditPermission) {
        return res.status(403).json({ message: 'You do not have permission to create a folder for this user.' , targetUser });
    }

    // Create the new folder
    const folder = new Folder({
        name,
        userId: targetUser._id,  // Assign the folder to the target user
    });

    // Save the folder
    await folder.save();

    // Add the folder to the target user's list of folders
    targetUser.folders.push(folder._id);
    await targetUser.save();

    return res.status(201).json({ message: 'Folder created successfully.', folder });
};

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
        shared.userId.toString() === folder.userId.toString() && shared.permission === 'edit'
    );

    if (!isFolderOwner && !hasEditRights) {
        return res.status(403).json({ message: 'You do not have permission to delete this folder.' });
    }

    if (folder.name == 'Default') {
        return res.status(400).json({ message: 'The default folder cannot be deleted.' });
    }

    const folderOwner = folder.userId;
    await Form.deleteMany({ folder: folder._id });

    await Folder.findByIdAndDelete(folderId);

    await User.findByIdAndUpdate(folderOwner, { $pull: { folders: folderId } });

    return res.status(200).json({ message: 'Folder deleted successfully.' });
}

//form Routes
const createform = async(req,res) =>{
    const {userId} = req.user;
    const {name,folder,elements} = req.body;

    const user = await User.findById(userId).populate({
        path: 'sharedDashboards',
        populate: {
            path: 'userId'
        }
    });
    
    const folderDoc = await Folder.findById(folder);

    if (!folderDoc) {
        return res.status(404).json({ message: 'Folder not found.' });
    }

    const existingForm = await Form.findOne({ name, folder });
    if (existingForm) {
        return res.status(400).json({ message: 'A form with this name already exists in the folder.' });
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
    const newForm = await Form.create({ name, folder, elements,userId: folderDoc.userId });

    // Add the form to the folder
    folderDoc.forms.push(newForm._id);
    await folderDoc.save();

    return res.status(201).json({ message: 'Form created successfully.', form: newForm });

}

const updateForm = async (req, res) => {
    const { userId } = req.user;
    const { formId } = req.params;
    const { name, folder, elements } = req.body;

    // Find the user, folder, and form documents
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

    // Validation: Ensure the new name does not conflict with other forms in the same folder
    if (name) {
        const existingForm = await Form.findOne({ name, folder });
        if (existingForm && !existingForm._id.equals(formId)) {
            return res.status(400).json({ message: 'A form with this name already exists in the folder.' });
        }
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
    await Form.deleteOne({_id:formId})
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

const encryptData = require('./../utils/Encrypt');
const createLink = async(req,res)=>{
    const {userId}= req.user;
    const {access} = req.body;
    
    if(!access){
        return res.status(400).json({message:"the access is not shared"});
    }

    const data = encryptData(userId,access);
    return res.status(200).json({message:"Link created successfully", link:data})
}

const decryptData = require("./../utils/Decrypt");
const verifyLink =async(req,res)=>{        
    const { userId } = req.user; 
    const { data } = req.params; 

    const rights = decryptData(data);
    if (!rights || !rights.userId || !rights.permission) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const requestingUser = await User.findById(userId);
    if (!requestingUser) {
        return res.status(404).json({ message: "Requesting user not found" });
    }

    requestingUser.sharedDashboards = requestingUser.sharedDashboards || [];

    const isDuplicate = requestingUser.sharedDashboards.some(
        (dashboard) => 
            dashboard.userId === rights.userId && 
            dashboard.permission === rights.permission
    );

    const isOwner = userId == rights.userId

    if(isOwner){
        return res.status(400).json({message:"User is owner of dashboard"});
    }
    if (isDuplicate) {
        return res.status(400).json({ message: "Rights already exist in sharedDashboards" });
    }

    requestingUser.sharedDashboards.push(rights);

    await requestingUser.save();

    return res.status(200).json({ 
        message: "Rights added to User", 
        rights 
    });
}

const Submission = require('./../models/SubmissionModel');
const ProgressTracking =require('./../models/ProgressTrackingModel');
const analytics = async (req, res) => {
    const { userId } = req.user; // Extract userId from authenticated user
    const { formId } = req.params; // Extract formId from route parameters

        // Find the form document
        const formDoc = await Form.findById(formId);
        if (!formDoc) {
            return res.status(404).json({ message: 'Form not found.' });
        }

        // Check if the form's userId matches the current user or if sharedDashboards includes the form owner
        const user = await User.findById(userId).populate('sharedDashboards.userId');

        const isOwner = formDoc.userId.equals(userId);
        const hasPermission = user.sharedDashboards.some((d) => d.userId._id.equals(formDoc.userId));

        if (!isOwner && !hasPermission) {
            return res.status(403).json({ message: 'You do not have permission to view this form.' });
        }

        // Fetch submissions and progress data
        const submissions = await Submission.find({ formId });
        const progress = await ProgressTracking.findOne({ formId });

        // Return analytics data
        res.status(200).json({
            form: formDoc,
            submissions,
            progress: {
                viewCount: progress ? progress.viewCount : 0,
                startedCount: progress ? progress.startedCount : 0,
                completedCount: progress ? progress.completedCount : 0,
            },
        });

    }

//User Routes
const getUser = async(req,res) =>{
    const {userId} = req.user;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }
    const user = await User.findById(userId)
    .populate({
        path: 'sharedDashboards', // Populate sharedDashboards
        populate: {
            path: 'userId', // Populate userId within sharedDashboards
            select: 'name email', // Select specific fields from User
        },
    });
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
    getFoldersUserBased:asyncHandler(getFoldersUserBased),
    createFolder:asyncHandler(createFolder),
    deleteFolder:asyncHandler(deleteFolder),
    
    //form
    deleteForm:asyncHandler(deleteForm),
    updateForm:asyncHandler(updateForm),
    createForm:asyncHandler(createform),

    //dashboard
    shareDashboard:asyncHandler(shareDashboard),
    createLink:asyncHandler(createLink),
    verifyLink:asyncHandler(verifyLink),

    //User
    getUser: asyncHandler(getUser),
    searchUser:asyncHandler(searchUser),

    analytics:asyncHandler(analytics)
}