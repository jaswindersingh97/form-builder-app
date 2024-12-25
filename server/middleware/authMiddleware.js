const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const User = require('./../models/UserModel');
const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.isAuthenticated = true;
        const userId = req.user._id;
        const user = await User.findById(userId).select('sharedDashboards');
        if (user) {
            req.user.sharedDashboards = user.sharedDashboards;  // Attach shared dashboards to the user
            next();
          } 

        next();  
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token. Access denied.' });
    }
};

module.exports = authMiddleware;