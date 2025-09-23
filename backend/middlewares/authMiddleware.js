const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  
  try {
    const token = req.cookies.jwtToken;

    if(!token){
      return res.status(401).json({message:"Unauthorized - no token Provided"})
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
          return res.status(401).json({message:"Unauthorized - no token Provided"})
      }
    const user  = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    req.user= user;
    
    next();

  } catch (error) {
      console.log('error in protectRouter : ',error.message);
      res.status(500).json({message:"internal server error"});
  }

};


const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin resource. Access denied.' });
  next();
};

module.exports = { authMiddleware, adminOnly };