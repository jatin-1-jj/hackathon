const jwt=require('jsonwebtoken');

 const generateToken=(userId,role,res)=>{
    
    const token = jwt.sign({userId,role},process.env.JWT_SECRET,{
        expiresIn:"2d"
    })

    res.cookie("jwtToken",token,{
        maxAge:2*24*60*60*1000,
        httpOnly:true,// prevent XSS attacks cross-site scripting attacks
        sameSite:"strict",// CSRF attack cross-site request forgery attacks
        secure:process.env.NODE_ENV !=="development"
    })

    return token;
};

module.exports = {generateToken}