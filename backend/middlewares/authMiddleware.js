const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Alumni = require("../models/Alumni");
const Faculty = require("../models/Faculty");


const protect = async (req, res, next) => {  
  try {
    const token = req.cookies.jwtToken;
    
    if(!token){
      return res.status(401).json({message:"Unauthorized - no token Provided"})
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET) 
    if(!decoded){
      return res.status(401).json({message:"Unauthorized - no token Provided"})
    }

    const role = decoded.role;
    let user;
    if(role==="admin"){
      user= await Admin.findById(decoded.userId).select("-password");
    }else if(role==="alumni"){
      user= await Alumni.findById(decoded.userId).select("-password");
    }else if(role=="faculty"){
      user= await Faculty.findById(decoded.userId).select("-password");
    }

    
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    req.user = user;
    
    next();

  } catch (error) {
      console.log('error in protect Router : ',error.message);
      res.status(500).json({message:"internal server error"});
  }

};

module.exports = { protect };