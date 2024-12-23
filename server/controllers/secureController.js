const asyncHandler = require('./../utils/asyncHandler');
const User = require('./../models/UserModel');

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
const getFolders = () =>{

}
const createFolder = () =>{

}
const  deleteFolder = ( ) =>{

}
const deleteFile = ()=>{

}
module.exports = {
    settings:asyncHandler(settings),
    getFolders:asyncHandler(getFolders),
    createFolder,deleteFolder,deleteFile
}