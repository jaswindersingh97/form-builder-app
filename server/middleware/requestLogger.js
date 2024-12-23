// requestLogger.js
const requestLogger = (req, res, next) => {
    const method = req.method;  // GET, POST, PUT, DELETE
    const url = req.originalUrl;  // The full URL requested
    const timestamp = new Date().toISOString();  // Timestamp of the request
    
    console.log(`[${timestamp}] ${method} request to ${url}`);
    
    next();  // Continue to the next middleware or route handler
  };
  
  module.exports = requestLogger;
  